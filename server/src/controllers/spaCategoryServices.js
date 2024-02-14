import SpaserviceCategorys from "../models/spaCategoryServices.js";

export const createSpaserviceCategory=async(req,res)=>{
    try {
        const spaserviceCategory=new SpaserviceCategorys({...req.body})
        await spaserviceCategory.save()
        res.status(200).json("created")
    } catch (error) {
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
        const {id}=req.params
        const spaserviceCategory=await SpaserviceCategorys.findByIdAndUpdate(id,req.body)
        res.status(200).json("updated")
    } catch (error) {
        res.status(500).json({messsage:error})
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