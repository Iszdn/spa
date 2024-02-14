import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
  image: {type:String ,require:true},   
  title:{type:String,require:true},
  description: {type:String,require:true},   
 name:{type:String,require:true},
 tag:[{
  type:Schema.Types.ObjectId,
ref:"lilacblogTags"
}],

 blogCategory:[{
  type:Schema.Types.ObjectId,
ref:"lilacblogCategory"
}],
 date: {
    type: Date,
    default: Date.now
  }
},{timestamps:true});

export default  mongoose.model('lilacblog', blogSchema);

