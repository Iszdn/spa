import mongoose from 'mongoose';
const { Schema } = mongoose;

const shopIconSchema = new Schema({
  image: String,   
});

const ShopIcon = mongoose.model('lilacShopIcon', shopIconSchema);

export default ShopIcon