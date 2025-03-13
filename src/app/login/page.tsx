import React, { Suspense } from 'react'
import { LoginContainer } from 'src/containers/login'

export const dynamic = 'force-dynamic'
export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContainer />
    </Suspense>
  )
}
