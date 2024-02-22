import Contacts from "../models/contact.js";


export const createContact=async(req,res)=>{
    try {
        const contact=new Contacts({
          ...req.body
        })
        await contact.save()
        res.status(200).json("created")
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getContact=async(req,res)=>{
    try {
        const contact=await Contacts.find({})
        res.json(contact)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}

export const updateContact=async(req,res)=>{
    try {
        const {id}=req.params
        const contact=await Contacts.findByIdAndUpdate(id,req.body)
        res.status(200).json("updated")
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}


export const deleteContact=async(req,res)=>{
    try {
        const {id}=req.params
        const contact=await Contacts.findByIdAndDelete(id)
        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}


export const getByIdContact=async(req,res)=>{
    try {
        const {id}=req.params
        const contact=await Contacts.findById(id)
        res.json(contact)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}