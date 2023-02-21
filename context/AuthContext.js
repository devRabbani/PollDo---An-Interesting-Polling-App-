import FullLoading from '@/components/FullLoading'
import { auth } from '@/lib/firebase'
import { AUTH_READY } from '@/reducers/actions'
import AuthReducer from '@/reducers/authReducer'
import { onAuthStateChanged } from 'firebase/auth'

const { createContext, useContext, useEffect, useReducer } = require('react')

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

const INITIAL_STATE = {
  user: null,
  isAuthReady: false,
}

export default function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch({ type: AUTH_READY, payload: user })
    })

    return () => unsub()
  }, [])

  if (!state.isAuthReady) {
    return <FullLoading />
  }

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
