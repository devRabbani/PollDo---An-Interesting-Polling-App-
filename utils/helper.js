import { db } from '@/lib/firebase'
import {
  addDoc,
  arrayUnion,
  collection,
  serverTimestamp,
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
    given: arrayUnion(user?.uid),
    createdBy: user?.displayName,
    uid: user?.uid,
    createdAt: serverTimestamp(),
  })
  return docRef?.id
}
