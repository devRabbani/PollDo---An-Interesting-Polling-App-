import Image from 'next/image'
import { RiCloseLine } from 'react-icons/ri'
import s from './modal.module.css'

export default function Modal({ img, setModalImg }) {
  console.log(img)
  return img ? (
    <div className={s.modalBody}>
      <div className={s.img}>
        <Image src={img} alt="Enlarged" fill />
      </div>
      <span onClick={() => setModalImg(null)} className={s.closeBtn}>
        <RiCloseLine />
      </span>
    </div>
  ) : null
}
