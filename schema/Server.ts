import mongoose from 'mongoose'

const serverSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  inviteCode: { type: String, unique: true },
  _profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', index: true }
}, { timestamps: true })

const Server = mongoose.models.Server || mongoose.model('Server', serverSchema)

export { Server }