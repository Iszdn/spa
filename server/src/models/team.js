import mongoose from 'mongoose';
const { Schema } = mongoose;

const TeamSchema = new Schema({
  image: {type:String, require:true},   
  title: {type:String, require:true},   
  position: {type:String, require:true},   
});

const Teams = mongoose.model('lilacTeam', TeamSchema);

export default Teams