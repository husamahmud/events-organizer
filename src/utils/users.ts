'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getUserFromToken } from '@/utils/authTools'
import { COOKIE_NAME } from '@/utils/constants'

/**
 * Retrieves the user object associated with the currently signed-in user.
 */
export async function getCurrentUser() {
  const token = cookies().get(COOKIE_NAME)
  if (!token) redirect('/signin')

  const user = await getUserFromToken(token)
  if (!user) redirect('/signin')

  return user
}
