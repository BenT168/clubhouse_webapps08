import * as mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: String,
  organisation: String,
  task: String,
  location: String,
  date: String
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
