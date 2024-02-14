import mongoose from 'mongoose';
const { Schema } = mongoose;

const SpaserviceCategorySchema = new Schema({ 
  image:{type:String, require:true},
  title:{type:String, require:true},
description:{type:String, require:true},
spaServices:[{
  type:Schema.Types.ObjectId,
  ref:"lilacSpaservice"
}]
},{timestamps:true});

const SpaserviceCategorys = mongoose.model('lilacSpaserviceCategory', SpaserviceCategorySchema);

export default SpaserviceCategorys
