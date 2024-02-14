import mongoose from 'mongoose';
const { Schema } = mongoose;

const heartIconSchema = new Schema({
  image: {type:String, require:true},   
});

const HeartIcon = mongoose.model('lilacHeartIcon', heartIconSchema);

export default HeartIcon