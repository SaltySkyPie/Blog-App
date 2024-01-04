import React from 'react'
import { AuthProvider as AuthKitAuthProvider } from 'react-auth-kit'
import refreshApi from './refresh'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthKitAuthProvider authType="localstorage" authName="_auth" refresh={refreshApi}>
      {children}
    </AuthKitAuthProvider>
  )
}
