import { auth } from '@/lib/firebase'
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
      dispatch({ type: 'AUTHREADY', payload: user })
    })

    return () => unsub()
  }, [])

  if (!state.isAuthReady) {
    return <h1>Loading...</h1>
  }

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
