import Logo from "../models/logo.js";

export const createLogo=async(req,res)=>{
    try {
        const logo=new Logo({
            image:req.body.image
        })
        await logo.save()
        res.status(200).json("created")
    } catch (error) {
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