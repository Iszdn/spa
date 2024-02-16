import upload from "../middleware/multer.js";
import cloudinary from "../utils/cloudinary.js";
import Marka from "../models/marka.js";

export const createMarka=async(req,res)=>{
    try {
        upload.fields([{name:'image'}])(req, res, async function (err) {
          if (err) {
            console.error(err);
            return res.status(400).json({ message: err.message });
          }
          const { image } = req.body;
  
            const MarkaResult = req.files["image"][0];
            const MarkaUpload = cloudinary.uploader.upload(MarkaResult.path, { folder: "Marka" });

            const [MarkaResponse] = await Promise.all([MarkaUpload]);
    
            const newMarka = new Marka({
            
              image: MarkaResponse.secure_url
            });
    
            await newMarka.save();
    
            res.status(200).send("Create New Marka");
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
}


export const getMarka=async(req,res)=>{
    try {
        const marka=await Marka.find({})
        res.json(marka)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}

export const updateMarka=async(req,res)=>{
    try {
        upload.fields([{ name: 'image' }])(req, res, async function (err) {
            if (err) {
                console.error(err);
                return res.status(400).json({ message: err.message });
            }
            try {
                const updatedMarka = await Marka.findByIdAndUpdate(req.params.id, {}, { new: true });

                if (updatedMarka) {
                    const { image } = req.body;

                    if (req.files["image"]) {
                        const MarkaResult = req.files["image"][0];
                        const MarkaUpload = cloudinary.uploader.upload(MarkaResult.path, { folder: "Marka" });
                        const [MarkaResponse] = await Promise.all([MarkaUpload]);
                        updatedMarka.image = MarkaResponse.secure_url;
                    }

                    if (image) updatedMarka.image = image;
                   

                    await updatedMarka.save();

                    res.status(200).json(updatedMarka); 
                } else {
                    res.status(404).json({ message: "Güncellenmek istenen Marka bulunamadı." });
                }
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const deleteMarka=async(req,res)=>{
    try {
        const {id}=req.params
        const marka=await Marka.findByIdAndDelete(id)
        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}


export const getByIdMarka=async(req,res)=>{
    try {
        const {id}=req.params
        const marka=await Marka.findById(id)
        res.json(marka)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}