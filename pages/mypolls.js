import Head from 'next/head'
import PollCard from '@/components/PollCard'
import useGetMyPolls from '@/hooks/useGetMyPolls'
import { useAuth } from '@/context/AuthContext'
import s from '@/styles/MyPolls.module.css'
import Loading from '@/components/Loading'

export default function MyPolls() {
  // Getting UID
  const { user } = useAuth()

  // Getting My Polls
  const { data, isLoading } = useGetMyPolls(user?.uid)

  return (
    <>
      <Head>
        <title>MyPolls | PollDoh</title>
      </Head>
      <div className={`wrapper ${s.body}`}>
        <h2 className="header">My Polls</h2>
        {isLoading ? (
          <Loading />
        ) : data.length ? (
          <div className={s.pollsWrapper}>
            {data.map((poll) => (
              <PollCard key={poll.pollid} data={poll} isOwn={true} />
            ))}
          </div>
        ) : (
          <p className={s.noResult}> No Data Found </p>
        )}
      </div>
    </>
  )
}
