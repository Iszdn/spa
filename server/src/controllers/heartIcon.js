import HeartIcon from "../models/heartIcon.js";


export const createHeartIcon=async(req,res)=>{
    try {
        const heartIcon=new HeartIcon({
            image:req.body.image
        })
        await heartIcon.save()
        res.status(200).json("created")
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getHeartIcon=async(req,res)=>{
    try {
        const heartIcon=await HeartIcon.find({})
        res.json(heartIcon)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}

export const updateHeartIcon=async(req,res)=>{
    try {
        const {id}=req.params
        const heartIcon=await HeartIcon.findByIdAndUpdate(id,req.body)
        res.status(200).json("updated")
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}


export const deleteHeartIcon=async(req,res)=>{
    try {
        const {id}=req.params
        const heartIcon=await HeartIcon.findByIdAndDelete(id)
        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}


export const getByIdHeartIcon=async(req,res)=>{
    try {
        const {id}=req.params
        const heartIcon=await HeartIcon.findById(id)
        res.json(heartIcon)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}