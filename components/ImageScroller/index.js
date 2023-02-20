import Image from 'next/image'
import { useState } from 'react'
import { RiCloseFill, RiZoomInLine } from 'react-icons/ri'
import Modal from '../Modal'
import s from './imageScroller.module.css'

export default function ImageScroller({ images, removeImage, edit }) {
  const [modalImg, setModalImg] = useState(null)

  return (
    <>
      <div className={s.imageScroller}>
        {images.map((image, i) => (
          <div className={s.img} key={i}>
            <Image src={image.img} alt="addad" fill />
            {edit ? (
              <span onClick={() => removeImage(i)} className={s.delete}>
                <RiCloseFill />
              </span>
            ) : (
              <span className={s.zoom} onClick={() => setModalImg(image.img)}>
                <RiZoomInLine />
              </span>
            )}

            <span className={s.option}>{edit ? i + 1 : image.option}</span>
          </div>
        ))}
      </div>
      <Modal img={modalImg} setModalImg={setModalImg} />
    </>
  )
}
