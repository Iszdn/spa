import mongoose from 'mongoose';
const { Schema } = mongoose;

const InstaSchema = new Schema({
  image: {type:String, require:true}   
});

const Insta = mongoose.model('lilacInsta', InstaSchema);

export default Insta