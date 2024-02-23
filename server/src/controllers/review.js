import Reviews from "../models/review.js";


export const createReview=async(req,res)=>{
    try {
        const review=new Reviews({
          ...req.body
        })
        await review.save()
        res.status(200).json("created")
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getReview=async(req,res)=>{
    try {
        const review=await Reviews.find({})
        res.json(review)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}

export const updateReview=async(req,res)=>{
    try {
        const {id}=req.params
        const review=await Reviews.findByIdAndUpdate(id,req.body)
        res.status(200).json("updated")
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}


export const deleteReview=async(req,res)=>{
    try {
        const {id}=req.params
        const review=await Reviews.findByIdAndDelete(id)
        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}


export const getByIdReview=async(req,res)=>{
    try {
        const {id}=req.params
        const review=await Reviews.findById(id)
        res.json(review)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}