import { NextResponse } from 'next/server'
import { connectDB } from '../mongodb/db'
import { User } from '@/schema/Users'

export async function POST(request: any) {
  await connectDB()

  try {
    const user = new User({
      username: 'Test User',
      email: 'test@example.com',
      password: 'testpassword'
    })

    await user.save()

    return NextResponse.json({ message: 'User created successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function GET(request: any) {
  await connectDB()

  try {
    const users = await User.find()
    return NextResponse.json(users)
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}