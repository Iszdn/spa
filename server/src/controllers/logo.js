import Logo from "../models/logo.js";

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
        const {id}=req.params
        const logo=await Logo.findByIdAndUpdate(id,req.body)
        res.status(200).json("updated")
    } catch (error) {
        res.status(500).json({messsage:error})
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