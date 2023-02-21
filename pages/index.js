import Head from 'next/head'
import s from '@/styles/Home.module.css'
import PollCard from '@/components/PollCard'
import Loading from '@/components/Loading'
import { AiOutlineReload } from 'react-icons/ai'
import { useRef } from 'react'
import { usePolls } from '@/context/PollsContext'

export default function Home() {
  // const load = useRef()
  const { polls, isLoading, loadMore, hasMore, btnLoading } = usePolls()

  // const loadMore = () => {
  //   setLoad(true)
  // }

  return (
    <>
      <Head>
        <title>Home | PollDoh</title>
      </Head>
      <div className={`wrapper ${s.homeBody}`}>
        <h2 className="header">Public Polls</h2>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className={s.pollsWrapper}>
              {polls.map((poll) => (
                <PollCard key={poll.pollid} data={poll} />
              ))}
            </div>
            {hasMore ? (
              <button
                onClick={loadMore}
                disabled={btnLoading}
                className={s.loadMoreBtn}
              >
                <AiOutlineReload /> {btnLoading ? 'Loading Wait' : 'Load More'}
              </button>
            ) : (
              <p className={s.noMorePolls}>
                Congrats You are at the end, No More Polls left
              </p>
            )}
          </>
        )}
      </div>
    </>
  )
}
