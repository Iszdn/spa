import upload from "../middleware/multer.js";
import cloudinary from "../utils/cloudinary.js";
import Insta from "../models/instagram.js";

export const createInsta=async(req,res)=>{
    try {
        upload.fields([{name:'image'}])(req, res, async function (err) {
          if (err) {
            console.error(err);
            return res.status(400).json({ message: err.message });
          }
          const { image } = req.body;
  
            const InstaResult = req.files["image"][0];
            const InstaUpload = cloudinary.uploader.upload(InstaResult.path, { folder: "Insta" });

            const [InstaResponse] = await Promise.all([InstaUpload]);
    
            const newInsta = new Insta({
            
              image: InstaResponse.secure_url
            });
    
            await newInsta.save();
    
            res.status(200).send("Create New Insta");
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
}


export const getInsta=async(req,res)=>{
    try {
        const insta=await Insta.find({})
        res.json(insta)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}

export const updateInsta=async(req,res)=>{
    try {
        upload.fields([{ name: 'image' }])(req, res, async function (err) {
            if (err) {
                console.error(err);
                return res.status(400).json({ message: err.message });
            }
            try {
                const updatedInsta = await Insta.findByIdAndUpdate(req.params.id, {}, { new: true });

                if (updatedInsta) {
                    const { image } = req.body;

                    if (req.files["image"]) {
                        const InstaResult = req.files["image"][0];
                        const InstaUpload = cloudinary.uploader.upload(InstaResult.path, { folder: "Insta" });
                        const [InstaResponse] = await Promise.all([InstaUpload]);
                        updatedInsta.image = InstaResponse.secure_url;
                    }

                    if (image) updatedInsta.image = image;
                   

                    await updatedInsta.save();

                    res.status(200).json(updatedInsta); 
                } else {
                    res.status(404).json({ message: "Güncellenmek istenen Insta bulunamadı." });
                }
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const deleteInsta=async(req,res)=>{
    try {
        const {id}=req.params
        const insta=await Insta.findByIdAndDelete(id)
        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}


export const getByIdInsta=async(req,res)=>{
    try {
        const {id}=req.params
        const insta=await Insta.findById(id)
        res.json(Insta)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}