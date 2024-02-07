import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProfileIconSchema = new Schema({
  image: String,   
});

const ProfileIcon = mongoose.model('lilacProfileIcon', ProfileIconSchema);

export default ProfileIcon