import { useRouter } from 'next/router'
import s from '@/styles/Poll.module.css'
import PollCard from '@/components/PollCard'
import usePollData from '@/hooks/usePollData'
import Head from 'next/head'
import Loading from '@/components/Loading'
import Error404 from '../404'

export default function Poll() {
  const router = useRouter()
  const {
    query: { pollid },
  } = router

  const { data, isLoading } = usePollData(pollid)

  if (!isLoading && !data) {
    return <Error404 />
  }

  return (
    <>
      <Head>
        <title>Poll | PollDoh</title>
      </Head>
      <div className={`wrapper ${s.pollBody}`}>
        <h2 className="header">Poll</h2>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <p>Poll Id : {pollid}</p>
            <PollCard data={data} />
          </>
        )}
      </div>
    </>
  )
}
