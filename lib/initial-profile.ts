import { currentUser, redirectToSignIn } from '@clerk/nextjs'
import { connectDB } from '@/mongodb/db'
import { Profile } from '@/schema/Profile'

export const initialProfile = async () => {
  await connectDB()

  const user = await currentUser()
  if (!user) return redirectToSignIn()

  const profile = await Profile.findOne({ userId: user.id })
  if (profile) return profile

  let newProfile = new Profile({
    userId: user?.id,
    name: `${user?.firstName} ${user?.lastName}`,
    imageUrl: user?.imageUrl,
    email: user.emailAddresses[0]?.emailAddress
  }).save()

  return newProfile
}

