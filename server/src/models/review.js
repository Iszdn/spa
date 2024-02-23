import mongoose from 'mongoose';
const { Schema } = mongoose;

const ReviewSchema = new Schema({
    
  review:{type:String,require:true},
  name: {type:String,require:true},   
  email: {type:String,require:true},   

},{timestamps:true});

const Reviews = mongoose.model('lilacReview', ReviewSchema);

export default Reviews