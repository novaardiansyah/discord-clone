import mongoose from 'mongoose'

enum Type { TEXT, AUDIO, VIDEO }

const channelSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: Object.values(Type), default: Type.TEXT},
  _profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', index: true },
  _serverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Server', index: true }
}, { timestamps: true })

const Channel = mongoose.models.Channel || mongoose.model('Channel', channelSchema)

export { Channel }