import s from './fullLoading.module.css'

export default function FullLoading() {
  return (
    <div className={s.body}>
      <div className={s.loadingDiv}>
        <p className={s.loading}>PollDo</p>
        <span>Loading</span>
      </div>
    </div>
  )
}
