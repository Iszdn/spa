import mongoose from 'mongoose';
const { Schema } = mongoose;

const ContactSchema = new Schema({
    
  location:{type:String,require:true},
  number: {type:String,require:true},   
  email: {type:String,require:true},   

},{timestamps:true});

const Contacts = mongoose.model('lilacContact', ContactSchema);

export default Contacts