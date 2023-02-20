import Head from 'next/head'
import s from '@/styles/Home.module.css'
import useGetPolls from '@/hooks/useGetPolls'
import PollCard from '@/components/PollCard'
import Loading from '@/components/Loading'
import { AiOutlineReload } from 'react-icons/ai'

export default function Home() {
  const { data, isLoading } = useGetPolls()

  console.log(data, isLoading)
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
              {data.map((poll) => (
                <PollCard key={poll.pollid} data={poll} />
              ))}
            </div>
            <button className={s.loadMoreBtn}>
              <AiOutlineReload /> Load More
            </button>
          </>
        )}
      </div>
    </>
  )
}
