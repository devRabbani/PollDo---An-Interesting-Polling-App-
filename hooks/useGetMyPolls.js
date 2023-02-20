import { db } from '@/lib/firebase'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'

export default function useGetMyPolls(uid) {
  // Local States
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  //  Side Effect
  useEffect(() => {
    const q = query(
      collection(db, 'polls'),
      where('uid', '==', uid),
      orderBy('createdAt', 'desc')
    )

    const unsub = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setData(
          snapshot.docs.map((item) => ({ ...item.data(), pollid: item.id }))
        )
      }
      setIsLoading(false)
    })

    return () => unsub()
  }, [uid])

  return { data, isLoading }
}
