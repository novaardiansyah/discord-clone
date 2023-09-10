import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  name: String,
  imageUrl: String,
  email: String
}, { timestamps: true })

const Profile = mongoose.models.Profile || mongoose.model('Profile', profileSchema)

export { Profile }