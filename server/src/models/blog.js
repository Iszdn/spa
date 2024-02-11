import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
  image: String,   
  title:String,
  description: String,   
 name:String,
 date: {
    type: Date,
    default: Date.now
  }
},{timestamps:true});

const Blogs = mongoose.model('lilacblog', blogSchema);

export default Blogs