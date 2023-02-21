import useLogout from '@/hooks/useLogout'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import {
  MdHourglassEmpty,
  MdInfoOutline,
  MdLogout,
  MdOutlinePoll,
} from 'react-icons/md'
import s from './profileMenu.module.css'

export default function ProfileMenu({ setIsMenu, avatarRef }) {
  // User Logout
  const { logout, isLoading } = useLogout()

  // Profile Div Ref
  const targetRef = useRef()

  const router = useRouter()
  const { pathname } = router

  const isMyPoll = pathname === '/mypolls'
  const isCredits = pathname === '/credits'

  const handleLogout = () => {
    logout()
    setIsMenu(false)
  }

  const handleNavigate = (route) => {
    router.push(route)
    setIsMenu(false)
  }

  // Getting Outside Click
  useEffect(() => {
    const handler = (e) => {
      if (
        !targetRef.current.contains(e.target) &&
        !avatarRef.current.contains(e.target)
      ) {
        setIsMenu(false)
      }
    }

    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className={s.profileMenu} ref={targetRef}>
      <div
        className={`${s.menu} ${isMyPoll ? 'active' : ''}`}
        onClick={() => handleNavigate('/mypolls')}
      >
        <MdOutlinePoll /> My Polls
      </div>
      <div
        className={`${s.menu} ${isCredits ? 'active' : ''}`}
        onClick={() => handleNavigate('/credits')}
      >
        <MdInfoOutline /> Credits
      </div>
      <button onClick={handleLogout} disabled={isLoading} className={s.menu}>
        {isLoading ? (
          <>
            <MdHourglassEmpty /> Logging Out
          </>
        ) : (
          <>
            <MdLogout /> Logout
          </>
        )}
      </button>
    </div>
  )
}
