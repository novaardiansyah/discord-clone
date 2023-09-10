'use client'

import { ModeToggle } from '@/components/mode-toggle'
import { UserButton } from '@clerk/nextjs'
import axios from 'axios'

const connect = async () => {
  const auth = await axios.get('/api/auth')
  console.log(auth)
}

const Home = () => {
  return (
    <div>
      <UserButton 
        afterSignOutUrl="/"
      />
      <ModeToggle />
      <button onClick={connect}>Connect</button>
    </div>
  )
}

export default Home
