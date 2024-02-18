import SpaserviceCategorys from "../models/spaCategoryServices.js";
import upload from "../middleware/multer.js";
import cloudinary from "../utils/cloudinary.js";


export const createSpaserviceCategory=async(req,res)=>{
    try {
        upload.fields([{name:'image'}])(req, res, async function (err) {
          if (err) {
            console.error(err);
            return res.status(400).json({ message: err.message });
          }
          const { image,title,description } = req.body;
  
            const SpaserviceCategoryResult = req.files["image"][0];
            const SpaserviceCategoryUpload = cloudinary.uploader.upload(SpaserviceCategoryResult.path, { folder: "SpaserviceCategory" });

            const [SpaserviceCategoryResponse] = await Promise.all([SpaserviceCategoryUpload]);
    
            const newSpaserviceCategory = new SpaserviceCategorys({
            
              image: SpaserviceCategoryResponse.secure_url,
              title:title,
              description:description
            });
    
            await newSpaserviceCategory.save();
    
            res.status(200).send("Create New SpaserviceCategory");
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
}


export const getSpaserviceCategory=async(req,res)=>{
    try {
        const spaserviceCategory=await SpaserviceCategorys.find({}).populate("spaServices")
        res.json(spaserviceCategory)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}


export const updateSpaserviceCategory=async(req,res)=>{
    try {
        upload.fields([{ name: 'image' }])(req, res, async function (err) {
            if (err) {
                console.error(err);
                return res.status(400).json({ message: err.message });
            }
            try {
                const updatedSpaserviceCategory = await SpaserviceCategorys.findByIdAndUpdate(req.params.id, {...req.body}, { new: true });

                if (updatedSpaserviceCategory) {
                    const { image } = req.body;
                
                    if (req.files["image"]) {
                        const SpaserviceCategoryResult = req.files["image"][0];
                        const SpaserviceCategoryUpload = cloudinary.uploader.upload(SpaserviceCategoryResult.path, { folder: "SpaserviceCategory" });
                        const [SpaserviceCategoryResponse] = await Promise.all([SpaserviceCategoryUpload]);
                        updatedSpaserviceCategory.image = SpaserviceCategoryResponse.secure_url;
                    }

                    if (image) updatedSpaserviceCategory.image = image;
                   

                    await updatedSpaserviceCategory.save();

                    res.status(200).json(updatedSpaserviceCategory); 
                } else {
                    res.status(404).json({ message: "Güncellenmek istenen SpaserviceCategory bulunamadı." });
                }
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteSpaserviceCategory=async(req,res)=>{
    try {
        const {id}=req.params
        const spaserviceCategory=await SpaserviceCategorys.findByIdAndDelete(id)
        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}


export const getByIdSpaserviceCategory=async(req,res)=>{
    try {
        const {id}=req.params
        const spaserviceCategory=await SpaserviceCategorys.findById(id).populate("spaServices")
        res.json(spaserviceCategory)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}