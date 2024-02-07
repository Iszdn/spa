import mongoose from 'mongoose';
const { Schema } = mongoose;

const heartIconSchema = new Schema({
  image: String,   
});

const HeartIcon = mongoose.model('lilacHeartIcon', heartIconSchema);

export default HeartIcon