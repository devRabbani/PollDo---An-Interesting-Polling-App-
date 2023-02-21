import { RiImageAddFill } from 'react-icons/ri'
import s from '@/styles/Create.module.css'
import { useRef } from 'react'
import { toast } from 'react-hot-toast'

export default function AttachImages({ attachments, setAttachments }) {
  // File Ref
  const fileRef = useRef()
  // Handle Files Change
  const handleChange = (e) => {
    const added = [...attachments]

    const files = e.target.files

    const accepted = ['image/svg', 'image/png', 'image/jpeg', 'images/gif']

    // If files exist
    if (files?.length) {
      // If no of files is more than 8
      if (added?.length > 4 || files?.length > 4) {
        toast.error(<b>Max limit 4 items reach! </b>)
        return
      }
      // Traversing over files
      for (const file of files) {
        if (accepted.includes(file?.type)) {
          if (added.findIndex((item) => item.name === file.name) === -1) {
            // To remove same file
            // If less than Max size
            if (file.size < 8 * 1000000) {
              const data = {
                file,
                img: URL.createObjectURL(file),
              }
              added.push(data) // added
              if (added.length >= 4) break // If max length
            } else {
              toast.error(<b>Max size limit per file is 8mb!</b>)
            }
          }
        } else {
          toast.error(<b>File type not supported</b>)
        }
      }
    }
    setAttachments(added)
    fileRef.current.value = ''
  }

  return (
    <>
      <input
        accept="image/*"
        onChange={handleChange}
        ref={fileRef}
        type="file"
        multiple
      />
      <button
        type="button"
        disabled={attachments.length > 3}
        onClick={() => fileRef.current.click()}
        className={s.addPhotoBtn}
      >
        <RiImageAddFill /> Attach
      </button>
    </>
  )
}
