import Link from 'next/link'
import { RiAddFill, RiAddLine, RiHome3Fill, RiHome3Line } from 'react-icons/ri'
import s from './nav.module.css'
import { useRouter } from 'next/router'
import useLogin from '@/hooks/useLogin'
import { useAuth } from '@/context/AuthContext'
import Image from 'next/image'
import { useRef, useState } from 'react'
import ProfileMenu from './profileMenu'
import { toast } from 'react-hot-toast'
import { MdHourglassEmpty, MdLogin } from 'react-icons/md'

export default function Nav() {
  // State
  const [isMenu, setIsMenu] = useState(false)
  // Avatar Ref
  const avatarRef = useRef()

  // Router
  const { pathname } = useRouter()
  // Checking Home Page
  const isHome = pathname === '/'
  const isCreate = pathname === '/create'

  // Getting Login Fxn and Loading
  const { login, isLoading } = useLogin()

  // Getting User Profile
  const { user } = useAuth()

  return (
    <nav>
      <div className={`wrapper ${s.nav}`}>
        <Link className={s.logo} href="/">
          PollDoh
        </Link>
        <ul className={s.menulist}>
          <li className={`${s.menu} ${isHome ? s.active : null}`}>
            <Link href="/">{isHome ? <RiHome3Fill /> : <RiHome3Line />}</Link>
          </li>
          <li className={`${s.menu} ${isCreate ? s.active : null}`}>
            {user ? (
              <Link href="/create">
                {isCreate ? <RiAddFill /> : <RiAddLine />}
              </Link>
            ) : (
              <div
                onClick={() => toast.error(<b>You need to login first!!</b>)}
              >
                <RiAddLine />
              </div>
            )}
          </li>
          <li className={s.avatarDiv}>
            {user ? (
              <div
                className={s.avatar}
                ref={avatarRef}
                onClick={() => setIsMenu((prev) => !prev)}
              >
                <Image
                  src={user?.photoURL}
                  alt={user?.displayName}
                  height={44}
                  width={44}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8//VrPQAJDgNaKVw6EQAAAABJRU5ErkJggg=="
                />
              </div>
            ) : (
              <button
                onClick={login}
                disabled={isLoading}
                className={s.authBtn}
              >
                {isLoading ? (
                  <>
                    <MdHourglassEmpty /> Logging
                  </>
                ) : (
                  <>
                    <MdLogin /> Log In
                  </>
                )}
              </button>
            )}
            {isMenu ? (
              <ProfileMenu setIsMenu={setIsMenu} avatarRef={avatarRef} />
            ) : null}
          </li>
        </ul>
      </div>
    </nav>
  )
}
