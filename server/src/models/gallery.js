import mongoose from 'mongoose';
const { Schema } = mongoose;

const logoSchema = new Schema({
  image: {type:String, require:true},   
});

const Logo = mongoose.model('lilacLogo', logoSchema);

export default Logo