import mongoose from 'mongoose';
const { Schema } = mongoose;

const shopIconSchema = new Schema({
  image: {type:String, require:true} 
});

const ShopIcon = mongoose.model('lilacShopIcon', shopIconSchema);

export default ShopIcon