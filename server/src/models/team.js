import mongoose from 'mongoose';
const { Schema } = mongoose;

const TeamSchema = new Schema({
  image: String,   
  title: String,   
  position: String,   
});

const Teams = mongoose.model('lilacTeam', TeamSchema);

export default Teams