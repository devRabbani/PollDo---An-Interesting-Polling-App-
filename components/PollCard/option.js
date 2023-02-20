import s from './pollcard.module.css'

export default function Option({
  option,
  isResult,
  setSelected,
  selected,
  options,
  total,
}) {
  console.count('Option')

  if (isResult) {
    const percent = (options[option] / total) * 100
    const width = percent.toFixed(4)

    return (
      <div className={s.optionResult}>
        <div style={{ width: width + '%' }} className={s.progress} />
        {option}
        <span className={s.percentage}>{percent.toFixed(0)}%</span>
      </div>
    )
  }
  return (
    <div
      onClick={() => setSelected(option)}
      className={`${s.option} ${selected === option ? s.active : ''}`}
    >
      {option}
    </div>
  )
}
