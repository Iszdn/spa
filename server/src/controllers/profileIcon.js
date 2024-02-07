import ProfileIcon from "../models/profileIcon.js";

export const createProfileIcon=async(req,res)=>{
    try {
        const profileIcon=new ProfileIcon({
            image:req.body.image
        })
        await profileIcon.save()
        res.status(200).json("created")
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getProfileIcon=async(req,res)=>{
    try {
        const profileIcon=await ProfileIcon.find({})
        res.json(profileIcon)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}

export const updateProfileIcon=async(req,res)=>{
    try {
        const {id}=req.params
        const profileIcon=await ProfileIcon.findByIdAndUpdate(id,req.body)
        res.status(200).json("updated")
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}


export const deleteProfileIcon=async(req,res)=>{
    try {
        const {id}=req.params
        const profileIcon=await ProfileIcon.findByIdAndDelete(id)
        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}


export const getByIdProfileIcon=async(req,res)=>{
    try {
        const {id}=req.params
        const profileIcon=await ProfileIcon.findById(id)
        res.json(profileIcon)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}