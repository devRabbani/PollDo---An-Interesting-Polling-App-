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
          <div
            className={`${s.img} ${images?.length === 1 ? s.fullWidth : null}`}
            key={i}
          >
            <Image
              src={image.img}
              alt="Options"
              sizes="(max-width:750px) 70vw,60vw"
              fill
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8//VrPQAJDgNaKVw6EQAAAABJRU5ErkJggg=="
            />
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
