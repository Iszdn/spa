import mongoose from 'mongoose';
const { Schema } = mongoose;

const faqSchema = new Schema({
    
  title:{type:String,require:true},
  description: {type:String,require:true},   

},{timestamps:true});

const Faqs = mongoose.model('lilacfaq', faqSchema);

export default Faqs