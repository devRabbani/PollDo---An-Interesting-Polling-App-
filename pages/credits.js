import s from '@/styles/Credits.module.css'

export default function Credits() {
  return (
    <div className={`${s.body} wrapper`}>
      <h2 className="header">Credits</h2>
      <div className={s.content}>
        <h1>Hey all Welcome to PollDoh</h1>
        <p>
          This app is made my CanWeBe! developers. It is made with mainly NextJs
          and Firebase. CWB&apos;s Developers build this kind of projects so
          enjoy this now and if you want to see more works like this checkout{' '}
          <a
            href="https://www.canwebe.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            CanWeBe!
          </a>
          .
        </p>
        <p className={s.footer}>
          All rights are resrved{' '}
          <a
            href="https://www.canwebe.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            CanWeBe!
          </a>{' '}
          {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}
