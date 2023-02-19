import { db } from '@/lib/firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export default function usePollData(pollid) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'polls', pollid),
      (snapshot) => {
        if (snapshot.exists()) {
          setData({ ...snapshot.data(), pollid })
        } else {
          setData(null)
        }
        setIsLoading(false)
      },
      (error) => {
        console.log(error)
      }
    )

    return () => unsub()
  }, [pollid])

  return { data, isLoading }
}
