'use client'

import Link from 'next/link'
import { useFormState } from 'react-dom'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

import { loginUser } from '@/actions/auth_actions'
import { FormState } from '@/types'
import SubmitButton from '@/components/SubmitButton'
import { useToast } from '@/hooks/use-toast'
import { useEffect } from 'react'

const initialState: FormState = {
  message: null,
}

export default function Page() {
  const [formState, action] = useFormState<FormState, FormData>(
    loginUser, initialState,
  )
  const { toast } = useToast()

  useEffect(() => {
    if (formState.message && formState.status) {
      toast({
        variant: formState.status === 'error' ? 'destructive' : 'default',
        title: formState.status === 'error' ? 'Error' : 'Success',
        description: formState.message,
      })
    }
  }, [formState, toast])

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Login to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password"
                     type="password"
                     name="password"
                     required />
            </div>

            <SubmitButton lable="Login" />

            <div className="mt-2 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/signup"
                    className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
