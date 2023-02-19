import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function PrivateRoute({ children }) {
  // Router
  const router = useRouter()

  //  getting User and Auth States
  const { user, isAuthReady } = useAuth()

  useEffect(() => {
    if (!user && isAuthReady) {
      router.push('/')
    }
  }, [user?.uid, isAuthReady])

  return user ? children : null
}
