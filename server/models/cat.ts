import * as mongoose from 'mongoose';

const catSchema = new mongoose.Schema({
  name: String,
  organisation: String,
  task: String,
  location: String,
  date: String
});

const Cat = mongoose.model('Cat', catSchema);

export default Cat;
