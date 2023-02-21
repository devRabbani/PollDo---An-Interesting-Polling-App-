import { AUTH_READY, LOGIN, LOGOUT } from './actions'

export default function AuthReducer(state, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload }
    case LOGOUT:
      return { ...state, user: null }
    case AUTH_READY:
      return { isAuthReady: true, user: action.payload }
    default:
      return state
  }
}
