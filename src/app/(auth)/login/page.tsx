'use client'

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

import { registerUser } from '@/actions/auth_actions'
import { FormState } from '@/types'
import SubmitButton from '@/components/SubmitButton'

const initialState: FormState = {
  message: null,
}

export default function Page() {
  const [formState, action] = useFormState<FormState, FormData>(
    registerUser, initialState,
  )

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Signup</CardTitle>
        <CardDescription>
          Sign up to create an account
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

            <SubmitButton lable="Sign up" />
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
