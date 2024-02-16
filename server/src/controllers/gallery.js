import upload from "../middleware/multer.js";
import cloudinary from "../utils/cloudinary.js";
import Gallery from "../models/gallery.js";

export const createGallery=async(req,res)=>{
    try {
        upload.fields([{name:'image'}])(req, res, async function (err) {
          if (err) {
            console.error(err);
            return res.status(400).json({ message: err.message });
          }
          const { image } = req.body;
  
            const GalleryResult = req.files["image"][0];
            const GalleryUpload = cloudinary.uploader.upload(GalleryResult.path, { folder: "Gallery" });

            const [GalleryResponse] = await Promise.all([GalleryUpload]);
    
            const newGallery = new Gallery({
            
              image: GalleryResponse.secure_url
            });
    
            await newGallery.save();
    
            res.status(200).send("Create New Gallery");
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
}


export const getGallery=async(req,res)=>{
    try {
        const gallery=await Gallery.find({})
        res.json(gallery)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}

export const updateGallery=async(req,res)=>{
    try {
        upload.fields([{ name: 'image' }])(req, res, async function (err) {
            if (err) {
                console.error(err);
                return res.status(400).json({ message: err.message });
            }
            try {
                const updatedGallery = await Gallery.findByIdAndUpdate(req.params.id, {}, { new: true });

                if (updatedGallery) {
                    const { image } = req.body;

                    if (req.files["image"]) {
                        const GalleryResult = req.files["image"][0];
                        const GalleryUpload = cloudinary.uploader.upload(GalleryResult.path, { folder: "Gallery" });
                        const [GalleryResponse] = await Promise.all([GalleryUpload]);
                        updatedGallery.image = GalleryResponse.secure_url;
                    }

                    if (image) updatedGallery.image = image;
                   

                    await updatedGallery.save();

                    res.status(200).json(updatedGallery); 
                } else {
                    res.status(404).json({ message: "Güncellenmek istenen Gallery bulunamadı." });
                }
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const deleteGallery=async(req,res)=>{
    try {
        const {id}=req.params
        const gallery=await Gallery.findByIdAndDelete(id)
        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}


export const getByIdGallery=async(req,res)=>{
    try {
        const {id}=req.params
        const gallery=await Gallery.findById(id)
        res.json(gallery)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}