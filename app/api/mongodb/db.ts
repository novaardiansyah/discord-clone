import mongoose from 'mongoose'

let isConnected: boolean = false

export const connectDB = async () => {
  if (isConnected == true) return true

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: process.env.DB_NAME,
    })
  }

  isConnected = true
  return true
}