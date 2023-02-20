import { useAuth } from '@/context/AuthContext'
import { giveVote, handleDelete, handleShare } from '@/utils/helper'
import { useState } from 'react'
import {
  MdDeleteOutline,
  MdOutlineDelete,
  MdOutlineDeleteOutline,
  MdOutlineIosShare,
} from 'react-icons/md'
import { AiOutlineDelete } from 'react-icons/ai'

import Option from './option'
import s from './pollcard.module.css'
import ImageScroller from '../ImageScroller'
import { usePolls } from '@/context/PollsContext'

export default function PollCard({ data, isOwn }) {
  const { question, options, given, createdBy, privacy, pollid, images } =
    data ?? {}

  // Getting User
  const { user } = useAuth()

  const { dispatch } = usePolls()

  // Checking SUbmited
  const isResult = given?.includes(user?.uid)
  const total = given?.length // Total Votes

  const sortFxn = (a, b) => a.localeCompare(b, 'en', { numeric: true })

  // Local States
  const [selected, setSelected] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  return (
    <div className={s.pollCard}>
      <div className={s.pollCard_topbar}>
        <p className={s.createdBy}>
          Created by {privacy === 'anonymous' ? 'Anonymous' : createdBy}
        </p>
        {isOwn ? (
          <button
            onClick={() => handleDelete(images, pollid, setIsDeleting)}
            disabled={isDeleting}
            className={s.deleteBtn}
          >
            <MdDeleteOutline /> {isDeleting ? 'deleting' : 'delete'}
          </button>
        ) : null}
        <button
          disabled={isSharing}
          onClick={() =>
            handleShare(
              question,
              `https://polldoh.vercel.app/poll/` + pollid,
              setIsSharing
            )
          }
          className={s.shareBtn}
        >
          <MdOutlineIosShare /> {isSharing ? 'sharing' : 'share this'}
        </button>
      </div>
      <h3>Q. {question}</h3>
      {images?.length ? (
        <ImageScroller images={images.sort((a, b) => a.option - b.option)} />
      ) : null}
      <div className={s.optionsWrapper}>
        {Object.keys(options)
          .sort(sortFxn)
          .map((option) => (
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
                giveVote(pollid, user?.uid, selected, setIsLoading, dispatch)
              }
              className={s.submitBtn}
            >
              {isLoading ? 'Voting' : 'Vote'}
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
