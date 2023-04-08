import { useAuth } from '@/context/AuthContext'
import { giveVote, handleDelete, handleShare } from '@/utils/helper'
import { useState } from 'react'
import { MdDeleteOutline, MdDoneAll, MdOutlineIosShare } from 'react-icons/md'
import Option from './option'
import s from './pollcard.module.css'
import ImageScroller from '../ImageScroller'
import { usePolls } from '@/context/PollsContext'
import { UPDATE_POLL_STATE } from '@/reducers/actions'

export default function PollCard({ data, isOwn, isRealtime }) {
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

  // function to update local states when not realtime
  const handleStateUpdate = () => {
    !isRealtime &&
      dispatch({
        type: UPDATE_POLL_STATE,
        payload: { uid: user?.uid, selected, pollid },
      })
  }

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
              `https://polldoh.canwebe.in/poll/` + pollid,
              setIsSharing
            )
          }
          className={s.shareBtn}
        >
          <MdOutlineIosShare /> {isSharing ? 'sharing' : 'share this'}
        </button>
      </div>
      <h3 className={question ? null : s.noQuestion}>Q. {question}</h3>
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
        {isResult ? (
          <p className={s.given}>
            <MdDoneAll /> Already Voted
          </p>
        ) : selected ? (
          <>
            <button
              disabled={isLoading}
              onClick={() =>
                giveVote(
                  pollid,
                  user?.uid,
                  selected,
                  setIsLoading,
                  handleStateUpdate
                )
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
