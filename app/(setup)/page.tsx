import React from 'react'
import { redirect } from 'next/navigation'
import { initialProfile } from '@/lib/initial-profile' 
import { connectDB } from '@/mongodb/db'
import { Member, Server } from '@/schema'
import InitialModal from '@/components/modals/initial-modal'

const Setup = async () => {
  await connectDB()

  const profile = await initialProfile()
  const member  = await Member.findOne({ _profileId: profile?._id})

  if (member) {
    const server = await Server.findOne({ _id: member?._serverId })
    if (server) return redirect(`/servers/${server.inviteCode}`)
  }

  return <InitialModal />
}

export default Setup
