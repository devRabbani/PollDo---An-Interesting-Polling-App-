export default function AuthReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    case 'AUTHREADY':
      return { isAuthReady: true, user: action.payload }
    default:
      return state
  }
}
