import { db } from '@/lib/firebase'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'

export default function useGetPolls() {
  // Local States
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  //  Side Effect
  useEffect(() => {
    const q = query(
      collection(db, 'polls'),
      where('listed', '==', true),
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
  }, [])

  return { data, isLoading }
}
