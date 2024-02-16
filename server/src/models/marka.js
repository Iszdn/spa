import mongoose from 'mongoose';
const { Schema } = mongoose;

const MarkaSchema = new Schema({
  image: {type:String, require:true},   
});

const Marka = mongoose.model('lilacMarka', MarkaSchema);

export default Marka