import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export { User }