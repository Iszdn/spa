import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogCategorySchema = new Schema({
 
 blogCategoryName:String,
 blogs:[{
  type:Schema.Types.ObjectId,
  ref:"lilacblog"
 }]

},{timestamps:true});

const BlogCategorys = mongoose.model('lilacblogCategory', blogCategorySchema);

export default BlogCategorys