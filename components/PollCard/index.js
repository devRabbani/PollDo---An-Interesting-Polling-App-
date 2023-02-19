import { useAuth } from '@/context/AuthContext'
import { giveVote } from '@/utils/helper'
import { useState } from 'react'
import Option from './option'
import s from './pollcard.module.css'

export default function PollCard({ data }) {
  const { question, options, given, createdBy, privacy, pollid } = data
  const [selected, setSelected] = useState('')

  const { user } = useAuth()

  const isResult = given?.includes(user?.uid)
  const total = given?.length

  // Local States
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className={s.pollCard}>
      <p className={s.createdBy}>
        Created by {privacy === 'anonyomous' ? 'Anonyomous' : createdBy}
      </p>
      <h3>
        <strong>Q. </strong> {question}
      </h3>
      <div className={s.optionsWrapper}>
        {Object.keys(options).map((option) => (
          <Option
            key={option}
            option={option}
            selected={selected}
            setSelected={setSelected}
            isResult={isResult}
            options={options}
            total={total}
          />
        ))}
      </div>
      <div className={s.pollCard_bottomDiv}>
        {selected && !isResult ? (
          <>
            <button
              disabled={isLoading}
              onClick={() =>
                giveVote(pollid, user?.uid, selected, setIsLoading)
              }
              className={s.submitBtn}
            >
              {isLoading ? 'Wait' : 'Submit'}
            </button>
            <button
              disabled={isLoading}
              onClick={() => setSelected('')}
              className={s.clearBtn}
            >
              Clear
            </button>
          </>
        ) : null}
        <p className={s.totalVotes}>Total Votes : {total}</p>
      </div>
    </div>
  )
}
