import ShopIcon from "../models/shopIcon.js"


export const createShopIcon=async(req,res)=>{
    try {
        const shopIcon=new ShopIcon({
            image:req.body.image
        })
        await shopIcon.save()
        res.status(200).json("created")
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getShopIcon=async(req,res)=>{
    try {
        const shopIcon=await ShopIcon.find({})
        res.json(shopIcon)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}

export const updateShopIcon=async(req,res)=>{
    try {
        const {id}=req.params
        const shopIcon=await ShopIcon.findByIdAndUpdate(id,req.body)
        res.status(200).json("updated")
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}


export const deleteShopIcon=async(req,res)=>{
    try {
        const {id}=req.params
        const shopIcon=await ShopIcon.findByIdAndDelete(id)
        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}


export const getByIdShopIcon=async(req,res)=>{
    try {
        const {id}=req.params
        const shopIcon=await ShopIcon.findById(id)
        res.json(shopIcon)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}