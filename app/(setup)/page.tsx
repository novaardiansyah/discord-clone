import React from 'react'
import { redirect } from 'next/navigation'
import { initialProfile } from '@/lib/initial-profile' 
import { connectDB } from '@/mongodb/db'
import { Member } from '@/schema/Member'
import InitialModal from '@/components/modals/initial-modal'

const Setup = async () => {
  await connectDB()

  const profile = await initialProfile()
  const member  = await Member.findOne({ _profileId: profile?._id})

  if (member) return redirect(`/servers/${member?._serverId}`)

  return <InitialModal />
}

export default Setup
