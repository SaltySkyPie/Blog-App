import React from 'react'
import { AuthProvider as AuthKitAuthProvider } from 'react-auth-kit'
import { refreshApi, useRefreshUserOnLoad } from './refresh'

const authName = '_auth'

const UserRefreseher = ({ children }: { children: React.ReactNode }) => {
  useRefreshUserOnLoad(authName)

  return <>{children}</>
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthKitAuthProvider authType="localstorage" authName={authName} refresh={refreshApi}>
      <UserRefreseher>{children}</UserRefreseher>
    </AuthKitAuthProvider>
  )
}
