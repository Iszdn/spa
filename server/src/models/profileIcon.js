import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProfileIconSchema = new Schema({
  image: {type:String, require:true}  
});

const ProfileIcon = mongoose.model('lilacProfileIcon', ProfileIconSchema);

export default ProfileIcon