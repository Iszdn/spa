import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogTagSchema = new Schema({
 
 blogTagsName:String,
 blogs:[{
  type:Schema.Types.ObjectId,
  ref:"lilacblog"
 }]

},{timestamps:true});

const BlogTags = mongoose.model('lilacblogTags', blogTagSchema);

export default BlogTags