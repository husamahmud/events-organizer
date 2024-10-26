'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { signup } from '@/utils/authTools'
import { FormState, SignupResponse } from '@/types'

const COOKIE_NAME = process.env.COOKIE_NAME!

const authSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

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
    return { message: 'Failed to register user' }
  }

  redirect('/dashboard')
}
