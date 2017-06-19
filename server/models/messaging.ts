import * as mongoose from 'mongoose';

const messagingSchema = new mongoose.Schema({
  room: String,
  nickname: String,
  message: String,
  updated_at: { type: Date, default: Date.now },
});

const Messaging = mongoose.model('Messaging', messagingSchema);

export default Messaging;
