import Image from 'next/image'
import { RiCloseFill } from 'react-icons/ri'
import s from './imageScroller.module.css'

export default function ImageScroller({ images, removeImage, edit }) {
  return (
    <div className={s.imageScroller}>
      {images.map((image, i) => (
        <div className={s.img} key={i}>
          <Image src={image.img} alt="addad" fill />
          {edit ? (
            <span onClick={() => removeImage(i)} className={s.delete}>
              <RiCloseFill />
            </span>
          ) : null}

          <span className={s.option}>{edit ? i + 1 : image.option}</span>
        </div>
      ))}
    </div>
  )
}
