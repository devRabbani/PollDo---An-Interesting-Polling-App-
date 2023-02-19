import { db } from '@/lib/firebase'
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  increment,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { toast } from 'react-hot-toast'

export const createPoll = async (question, options, privacy, user) => {
  const optionsObj = options.reduce((obj, item) => {
    return {
      ...obj,
      [item]: 0,
    }
  }, {})

  const colRef = collection(db, 'polls')
  const docRef = await addDoc(colRef, {
    question,
    options: optionsObj,
    privacy,
    given: [],
    listed: privacy === 'private' ? false : true,
    createdBy: user?.displayName,
    uid: user?.uid,
    createdAt: serverTimestamp(),
  })
  return docRef?.id
}

export const giveVote = async (pollid, uid, selected, setIsLoading) => {
  const id = toast.loading(<b>Submiting..</b>)
  setIsLoading(true)
  try {
    const docRef = doc(db, 'polls', pollid)

    await updateDoc(docRef, {
      given: arrayUnion(uid),
      ['options.' + selected]: increment(1),
    })

    setIsLoading(false)
    toast.success(<b>Submitted Successfully</b>, { id })
  } catch (error) {
    console.log(error)
    toast.error(<b>{error.message}</b>, { id })
    setIsLoading(false)
  }
}
