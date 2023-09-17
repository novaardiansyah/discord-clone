import { auth } from '@clerk/nextjs'

import { connectDB } from '@/mongodb/db'
import { Profile } from '@/schema/Profile'

export const currentProfile = async () => {
  const { userId } = auth()
  if (!userId) return false

  connectDB()
  const profile = await Profile.findOne({ userId })

  return profile
}