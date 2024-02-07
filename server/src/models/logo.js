import mongoose from 'mongoose';
const { Schema } = mongoose;

const logoSchema = new Schema({
  image: String,   
});

const Logo = mongoose.model('lilacLogo', logoSchema);

export default Logo