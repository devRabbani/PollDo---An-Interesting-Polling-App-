import { useAuth } from '@/context/AuthContext'
import { auth, googleProvider } from '@/lib/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false)

  const { dispatch } = useAuth()

  const login = async () => {
    const id = toast.loading(<b>Logging in please wait..</b>)
    try {
      setIsLoading(true)
      const user = await signInWithPopup(auth, googleProvider)
      if (user) {
        dispatch({ type: 'LOGIN', payload: user.user })
        toast.success(<b>Welcome {user?.user?.displayName}</b>, { id })
        setIsLoading(false)
      } else {
        throw new Error('Something went wrong try again!')
      }
    } catch (error) {
      toast.error(<b>{error.message}</b>, { id })
      console.log(error)
      setIsLoading(false)
    }
  }
  return { login, isLoading }
}
