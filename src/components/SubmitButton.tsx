'use client'

import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'

export default function SubmitButton({ lable, ...btnProps }: {
  lable: string
}) {
  const { pending } = useFormStatus()

  return (
    <Button
      {...btnProps}
      type="submit"
      className="w-full"
      disabled={pending}
    >
      {lable}
    </Button>
  )
}
