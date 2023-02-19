import { useRouter } from 'next/router'
import s from '@/styles/Poll.module.css'
import PollCard from '@/components/PollCard'
import usePollData from '@/hooks/usePollData'

export default function Poll() {
  const router = useRouter()
  const {
    query: { pollid },
  } = router

  const { data, isLoading } = usePollData(pollid)

  console.log(data, isLoading, 'Poll Data')

  return (
    <div className={`wrapper ${s.pollBody}`}>
      <h2 className="header">Poll</h2>
      <p>Poll Id : {pollid}</p>
      <PollCard />
    </div>
  )
}
