import s from './pollcard.module.css'

export default function PollCard() {
  const options = {
    a: 0,
    b: 0,
    c: 0,
  }
  return (
    <div className={s.pollCard}>
      <p>Created by Rusty Steel</p>
      <h3>
        Q. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Perferendis, magni nostrum placeat ipsa debitis temporibus nobi
      </h3>
      <div className={s.optionsWrapper}>
        {Object.keys(options).map((option) => (
          <div className={s.option} key={option}>
            {option}
          </div>
        ))}
      </div>
    </div>
  )
}
