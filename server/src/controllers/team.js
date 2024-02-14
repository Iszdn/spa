import Teams from "../models/team.js";
import upload from "../middleware/multer.js";
import cloudinary from "../utils/cloudinary.js";


export const createTeams=async(req,res)=>{
    try {
        upload.fields([{name:'image'}])(req, res, async function (err) {
          if (err) {
            console.error(err);
            return res.status(400).json({ message: err.message });
          }
          const { image,title,position } = req.body;
  
            const TeamsResult = req.files["image"][0];
            const TeamsUpload = cloudinary.uploader.upload(TeamsResult.path, { folder: "Teams" });

            const [TeamsResponse] = await Promise.all([TeamsUpload]);
    
            const newTeams = new Teams({
            
              image: TeamsResponse.secure_url,
              title:title,
              position:position
            });
    
            await newTeams.save();
    
            res.status(200).send("Create New Teams");
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
}


export const getTeams=async(req,res)=>{
    try {
        const teams=await Teams.find({})
        res.json(teams)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}

export const updateTeams=async(req,res)=>{
    try {
        upload.fields([{ name: 'image' }])(req, res, async function (err) {
            if (err) {
                console.error(err);
                return res.status(400).json({ message: err.message });
            }
            try {
                const updatedTeams = await Teams.findByIdAndUpdate(req.params.id, {...req.body}, { new: true });

                if (updatedTeams) {
                    const { image } = req.body;

                    if (req.files["image"]) {
                        const TeamsResult = req.files["image"][0];
                        const TeamsUpload = cloudinary.uploader.upload(TeamsResult.path, { folder: "Teams" });
                        const [TeamsResponse] = await Promise.all([TeamsUpload]);
                        updatedTeams.image = TeamsResponse.secure_url;
                    }

                    if (image) updatedTeams.image = image;
                   

                    await updatedTeams.save();

                    res.status(200).json(updatedTeams); 
                } else {
                    res.status(404).json({ message: "Güncellenmek istenen Teams bulunamadı." });
                }
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const deleteTeams=async(req,res)=>{
    try {
        const {id}=req.params
        const team=await Teams.findByIdAndDelete(id)
        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}


export const getByIdTeams=async(req,res)=>{
    try {
        const {id}=req.params
        const team=await Teams.findById(id)
        res.json(team)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}