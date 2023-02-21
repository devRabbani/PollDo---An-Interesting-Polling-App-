import { db } from '@/lib/firebase'
import {
  LOAD_DATA_FINISH,
  LOAD_MORE_FINISH,
  LOAD_MORE_START,
} from '@/reducers/actions'
import PollsReducer from '@/reducers/pollsReducer'
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore'

const {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} = require('react')

const PollsContext = createContext()

export const usePolls = () => useContext(PollsContext)

const INITIAL_STATE = {
  polls: [],
  isLoading: true,
  last: null,
  hasMore: true,
  btnLoading: false,
}

export default function PollsContextProvider({ children }) {
  const [state, dispatch] = useReducer(PollsReducer, INITIAL_STATE)

  // Limit
  const LIMIT = 4

  const loadMore = async () => {
    dispatch({ type: LOAD_MORE_START })
    const q = query(
      collection(db, 'polls'),
      where('listed', '==', true),
      orderBy('createdAt', 'desc'),
      startAfter(state.last),
      limit(LIMIT)
    )
    const snapshot = await getDocs(q)
    const newData = snapshot.docs.map((item) => ({
      ...item.data(),
      pollid: item.id,
    }))
    dispatch({
      type: LOAD_MORE_FINISH,
      payload: {
        data: newData,
        last: snapshot.docs[snapshot.docs.length - 1],
        more: newData.length === LIMIT,
      },
    })
  }

  const loadPolls = async () => {
    // dispatch({ type: LOAD_DATA_START })
    const q = query(
      collection(db, 'polls'),
      where('listed', '==', true),
      orderBy('createdAt', 'desc'),
      limit(LIMIT)
    )

    const snapshot = await getDocs(q)
    const newData = snapshot.docs.map((item) => ({
      ...item.data(),
      pollid: item.id,
    }))
    dispatch({
      type: LOAD_DATA_FINISH,
      payload: {
        data: newData,
        last: snapshot.docs[snapshot.docs.length - 1],
        more: snapshot.docs.length === LIMIT,
      },
    })
  }

  //  Side Effect
  useEffect(() => {
    loadPolls()
  }, [])

  return (
    <PollsContext.Provider value={{ ...state, dispatch, loadMore }}>
      {children}
    </PollsContext.Provider>
  )
}
