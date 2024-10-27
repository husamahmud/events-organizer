'use server'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'

import { db } from '@/db/db'
import { users } from '@/db/schema'
import { SECRET } from '@/utils/constants'


/**
 * Creates a JWT token for a user.
 *
 * @param userId - The ID of the user to create a token for.
 * @returns A promise that resolves to the JWT token.
 */
export const createTokenForUser = async (userId: string): Promise<string> => {
  return jwt.sign({ id: userId }, SECRET)
}

/**
 * Retrieves a user object from the database using a provided JWT token.
 *
 * @param token - An object containing the JWT token in the `value` field.
 * @returns A promise that resolves to the user object containing the user's id, email, and createdAt fields,
 *          or null if no user is found with the id extracted from the token.
 * @throws An error if the token is invalid or if verification fails.
 */
export const getUserFromToken = async (token: {
  name: string
  value: string
}) => {
  const payload = jwt.verify(token.value, SECRET) as { id: string }

  return db.query.users.findFirst({
    where: eq(users.id, payload.id),
    columns: {
      id: true,
      email: true,
      createdAt: true,
    },
  })
}

/**
 * Signs in a user and returns a JWT token if the provided credentials are valid.
 *
 * @param email - The email of the user to sign in.
 * @param password - The password of the user to sign in.
 * @returns A promise that resolves to an object containing the user object and the JWT token.
 * @throws An error if the user does not exist or the password is incorrect.
 */
export const signin = async ({ email, password }: {
  email: string
  password: string
}) => {
  const match = await db.query.users.findFirst({
    where: eq(users.email, email),
  })
  if (!match) throw new Error('invalid user')

  const correctPW = await comparePW(password, match.password)
  if (!correctPW) throw new Error('invalid user')

  const token = await createTokenForUser(match.id)
  const { password: pw, ...user } = match

  return { user, token }
}

/**
 * Signs up a user and returns a JWT token if the provided credentials are valid.
 *
 * @param email - The email of the user to sign up.
 * @param password - The password of the user to sign up.
 * @returns A promise that resolves to an object containing the user object and the JWT token.
 * @throws An error if the user already exists or a database error occurs.
 */
export const signup = async ({ email, password }: {
  email: string
  password: string
}) => {
  const hashedPW = await hashPW(password)
  const rows = await db
    .insert(users)
    .values({ email, password: hashedPW })
    .returning({
      id: users.id,
      email: users.email,
      createdAt: users.createdAt,
    })

  const user = rows[0]
  const token = await createTokenForUser(user.id)

  return { user, token }
}

/**
 * Hashes a given password using bcrypt.
 *
 * @param password - The password to hash.
 * @returns A promise that resolves to the hashed password.
 */
export const hashPW = (password: string) => {
  return bcrypt.hash(password, 10)
}

/**
 * Compares a plain text password with a hashed password to determine if they match.
 *
 * @param password - The plain text password to verify.
 * @param hashedPW - The hashed password to compare against.
 * @returns A promise that resolves to a boolean indicating whether the password matches the hash.
 */
export const comparePW = (password: string, hashedPW: string) => {
  return bcrypt.compare(password, hashedPW)
}
