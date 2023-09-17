import { v4 as uuidv4 } from 'uuid'
import { currentProfile } from '@/lib/current-profile'
import { NextResponse } from 'next/server'
import { Server, Channel, Member, MemberRole } from '@/schema'

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json()
    const inviteCode = uuidv4()

    const profile = await currentProfile()

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const server = await Server.create({
      name,
      imageUrl,
      inviteCode,
      _profileId: profile._id
    }).then(() => {
      return Server.findOne({ inviteCode })
    })

    const channel = await Channel.create({
      name: 'General',
      _profileId: profile._id,
      _serverId: server._id
    }).then(() => {
      return Channel.findOne({ name: 'General', _serverId: server._id })
    })
    
    const member = Member.create({
      name: profile.name,
      role: MemberRole.ADMIN,
      _profileId: profile._id,
      _serverId: server._id
    }).then(() => {
      return Member.findOne({ _profileId: profile._id, _serverId: server._id })
    })
    
    return NextResponse.json({ server, channel, member }, { status: 200 })
  } catch (error) {
    console.log('SERVER_POST', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}