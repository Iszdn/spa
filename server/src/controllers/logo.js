import Logo from "../models/logo.js";
import upload from "../middleware/multer.js";
import cloudinary from "../utils/cloudinary.js";
// export const createLogo=async(req,res)=>{
//     try {
//         const logo=new Logo({
//             image:req.body.image
//         })
//         await logo.save()
//         res.status(200).json("created")
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }


export const createLogo=async(req,res)=>{
    try {
        upload.fields([{name:'image'}])(req, res, async function (err) {
          if (err) {
            console.error(err);
            return res.status(400).json({ message: err.message });
          }
          const { image } = req.body;
  
            const LogoResult = req.files["image"][0];
            const LogoUpload = cloudinary.uploader.upload(LogoResult.path, { folder: "Logo" });

            const [LogoResponse] = await Promise.all([LogoUpload]);
    
            const newLogo = new Logo({
            
              image: LogoResponse.secure_url
            });
    
            await newLogo.save();
    
            res.status(200).send("Create New Logo");
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
}


export const getLogo=async(req,res)=>{
    try {
        const logo=await Logo.find({})
        res.json(logo)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}

export const updateLogo=async(req,res)=>{
    try {
        upload.fields([{ name: 'image' }])(req, res, async function (err) {
            if (err) {
                console.error(err);
                return res.status(400).json({ message: err.message });
            }
            try {
                const updatedLogo = await Logo.findByIdAndUpdate(req.params.id, {}, { new: true });

                if (updatedLogo) {
                    const { image } = req.body;

                    if (req.files["image"]) {
                        const LogoResult = req.files["image"][0];
                        const LogoUpload = cloudinary.uploader.upload(LogoResult.path, { folder: "Logo" });
                        const [LogoResponse] = await Promise.all([LogoUpload]);
                        updatedLogo.image = LogoResponse.secure_url;
                    }

                    if (image) updatedLogo.image = image;
                   

                    await updatedLogo.save();

                    res.status(200).json(updatedLogo); 
                } else {
                    res.status(404).json({ message: "Güncellenmek istenen Logo bulunamadı." });
                }
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const deleteLogo=async(req,res)=>{
    try {
        const {id}=req.params
        const logo=await Logo.findByIdAndDelete(id)
        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}


export const getByIdLogo=async(req,res)=>{
    try {
        const {id}=req.params
        const logo=await Logo.findById(id)
        res.json(logo)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}