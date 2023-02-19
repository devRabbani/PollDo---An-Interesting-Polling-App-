import useLogout from '@/hooks/useLogout'
import Link from 'next/link'
import { FaHourglassHalf, FaSignOutAlt } from 'react-icons/fa'
import { MdOutlinePoll } from 'react-icons/md'
import s from './profileMenu.module.css'

export default function ProfileMenu({ setIsMenu }) {
  const { logout, isLoading } = useLogout()
  const handleLogout = () => {
    logout()
    setIsMenu(false)
  }

  return (
    <div className={s.profileMenu}>
      <Link className={s.menu} href="/mypolls">
        <MdOutlinePoll /> My Polls
      </Link>
      <button onClick={handleLogout} disabled={isLoading} className={s.menu}>
        {isLoading ? (
          <>
            <FaHourglassHalf /> Logging Out
          </>
        ) : (
          <>
            <FaSignOutAlt /> Logout
          </>
        )}
      </button>
    </div>
  )
}
