import s from '@/styles/Create.module.css'
import { useState } from 'react'
import { MdOutlineRemoveCircleOutline } from 'react-icons/md'

export default function Create() {
  // Local States
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState(['', ''])
  const [privacy, setPrivacy] = useState('public')
  const [isCreating, setIsCreating] = useState(false)

  // Custome Functions
  const addOption = () => {
    setOptions((prev) => [...prev, ''])
  }

  // Change Options Input
  const handleChangeOption = (e, i) => {
    const list = [...options]
    list[i] = e.target.value
    setOptions(list)
  }

  // Remove Options
  const handleRemove = (i) => {
    const list = [...options]
    list.splice(i, 1)
    console.log(list)
    setOptions(list)
  }

  return (
    <div className={`wrapper ${s.createBody}`}>
      <h2 className="header">Create Poll </h2>
      <form>
        <div className={s.formDiv}>
          <label>Type Your Question</label>
          <textarea
            rows={2}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Eg: What is best React or NextJs"
          />
        </div>
        <div className={s.optionsWrapper}>
          {options.map((option, i) => (
            <div key={i} className={s.formDiv}>
              <div className={s.labelDiv}>
                <label>Option {i + 1}</label>
                {i > 1 ? (
                  <MdOutlineRemoveCircleOutline
                    onClick={() => handleRemove(i)}
                  />
                ) : null}
              </div>
              <input
                onChange={(e) => handleChangeOption(e, i)}
                type="text"
                value={option}
                placeholder={`Eg: Option ${i + 1}`}
              />
            </div>
          ))}
        </div>
        <button
          disabled={options.length > 4}
          className="btn"
          onClick={addOption}
          type="button"
        >
          Add More
        </button>
        <div className={s.formDiv}>
          <label>Privacy</label>
          <select onChange={(e) => setPrivacy(e.target.value)} value={privacy}>
            <option value="public">Public (Listed)</option>
            <option value="private">Private (Unlisted)</option>
            <option value="private">Anonymous (Listed)</option>
          </select>
        </div>
        <button className="btn full" type="submit">
          Create Poll
        </button>
      </form>
    </div>
  )
}
