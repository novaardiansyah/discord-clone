import mongoose from 'mongoose'

enum Role { ADMIN, MODERATOR, GUEST }

const memberSchema = new mongoose.Schema({
  name: String,
  role: { type: String, enum: Object.values(Role), default: Role.GUEST},
  _profileId: { type: mongoose.Schema.ObjectId, ref: 'Profile', index: true },
  _serverId: { type: mongoose.Schema.ObjectId, ref: 'Server', index: true }
}, { timestamps: true })

const Member = mongoose.models.Member || mongoose.model('Member', memberSchema)

export { Member } 