import { useAuth } from '@/context/AuthContext'
import { auth } from '@/lib/firebase'
import { LOGOUT } from '@/reducers/actions'
import { signOut } from 'firebase/auth'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function useLogout() {
  const [isLoading, setIsLoading] = useState(false)

  const { dispatch } = useAuth()

  const logout = async () => {
    try {
      setIsLoading(true)
      await signOut(auth)
      dispatch({ type: LOGOUT })
      setIsLoading(false)
    } catch (error) {
      toast.error(<b>{error.message}</b>)
      console.log(error)
      setIsLoading(false)
    }
  }
  return { logout, isLoading }
}
