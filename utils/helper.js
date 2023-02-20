import { db, storage } from '@/lib/firebase'
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  increment,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage'
import { toast } from 'react-hot-toast'

export const createPoll = async (
  question,
  options,
  privacy,
  user,
  attachments
) => {
  const docRef = doc(collection(db, 'polls'))
  let images = []

  if (attachments.length) {
    let promises = []
    attachments.forEach((attachment, i) => {
      const fileName = `${docRef.id}/${Date.now()}`
      const fileRef = ref(storage, fileName)

      const uploadTask = uploadBytes(fileRef, attachment.file).then(
        async (snapshot) => {
          const url = await getDownloadURL(snapshot.ref)

          images.push({
            img: url,
            option: i + 1,
            fileName,
          })
        }
      )
      promises.push(uploadTask)
    })

    await Promise.all(promises)
  }

  const optionsObj = options.reduce((obj, item) => {
    return {
      ...obj,
      [item]: 0,
    }
  }, {})

  await setDoc(docRef, {
    question,
    options: optionsObj,
    privacy,
    given: [],
    listed: privacy === 'private' ? false : true,
    createdBy: user?.displayName,
    uid: user?.uid,
    createdAt: serverTimestamp(),
    images,
  })
  return docRef?.id
}

export const giveVote = async (pollid, uid, selected, setIsLoading) => {
  if (!uid) {
    toast.error(<b>Login first</b>)
    return
  }
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

export const handleShare = async (text, url, setIsSharing) => {
  try {
    if (!navigator?.share) {
      toast.error(<b>Not supported in this device</b>)
      return
    }
    setIsSharing(true)
    const shareData = {
      title: 'Checkout this poll on PollDoh',
      url: url || 'https://polldoh.vercel.app',
      text: text || 'Click the link to get to the poll',
    }
    await navigator.share(shareData)
    setIsSharing(false)
  } catch (error) {
    console.log(error)
    toast.error(<b>{error.message}</b>)
    setIsSharing(false)
  }
}

export const handleDelete = async (images, pollid, setIsDeleting) => {
  const id = toast.loading(<b>Deleting please wait</b>)
  try {
    setIsDeleting(true)
    if (images?.length) {
      const promises = images.map((image) => {
        return deleteObject(ref(storage, image.fileName))
      })
      await Promise.all(promises)
    }
    await deleteDoc(doc(db, 'polls', pollid))
    setIsDeleting(false)
    toast.success(<b>Deleted Successfully</b>, { id })
  } catch (error) {
    console.log(error)
    toast.error(<b>{error.message}</b>, { id })
    setIsDeleting(false)
  }
}
