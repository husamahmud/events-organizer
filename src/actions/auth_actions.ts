'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { signin, signup } from '@/utils/authTools'
import { FormState, SignupResponse } from '@/types'
import { toast } from '@/hooks/use-toast'

const COOKIE_NAME = process.env.COOKIE_NAME!

const authSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

/**
 * Registers a new user with the provided form data, sets a cookie with a JWT token,
 * and redirects to the home page upon successful registration.
 *
 * @param prevState - The previous state of the form, containing any messages or errors.
 * @param formData - The form data containing the user's email and password.
 * @returns A promise that resolves to a new FormState object with a success or error message.
 * @throws Will log an error and return a failure message if the registration process fails.
 */
export const registerUser = async (prevState: FormState, formData: FormData): Promise<FormState> => {
  const data = authSchema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  try {
    const { token }: SignupResponse = await signup(data)

    cookies().set({
      name: COOKIE_NAME,
      value: token,
    })
  } catch (e) {
    console.error(e)
    return {
      message: 'Failed to login user. Please check your credentials and try again.',
      status: 'error',
    }
  }

  redirect('/')
}

/**
 * Logs in a user with the provided form data, sets a cookie with a JWT token,
 * and redirects to the home page upon successful login.
 *
 * @param prevState - The previous state of the form, containing any messages or errors.
 * @param formData - The form data containing the user's email and password.
 * @returns A promise that resolves to a new FormState object with a success or error message.
 * @throws Will log an error and return a failure message if the login process fails.
 */
export const loginUser = async (prevState: FormState, formData: FormData): Promise<FormState> => {
  const data = authSchema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  try {
    const { token }: SignupResponse = await signin(data)

    cookies().set({
      name: COOKIE_NAME,
      value: token,
    })
  } catch (e) {
    return {
      message: 'Failed to login user. Please check your credentials and try again.',
      status: 'error',
    }
  }

  redirect('/')
}
