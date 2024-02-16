import mongoose from 'mongoose';
const { Schema } = mongoose;

const GallerySchema = new Schema({
  image: {type:String, require:true},   
});

const Gallery = mongoose.model('lilacGallery', GallerySchema);

export default Gallery