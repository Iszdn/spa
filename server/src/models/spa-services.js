import mongoose from 'mongoose';
const { Schema } = mongoose;

const SpaserviceSchema = new Schema({
   
  title:{type:String, require:true},
description:{type:String, require:true},
duration:{type:Number, require:true},
price:{type:Number,require:true},
spaCategory:[{
  type:Schema.Types.ObjectId,
ref:"lilacSpaserviceCategory"
}]
},{timestamps:true});

const Spaservices = mongoose.model('lilacSpaservice', SpaserviceSchema);

export default Spaservices
