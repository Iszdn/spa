import BlogTags from "../models/blogtag.js";

export const createBlogTag=async(req,res)=>{
    try {
        const blogTag=new BlogTags({...req.body})
        await blogTag.save()
        res.status(200).json("created")
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getBlogTag=async(req,res)=>{
    try {
        const blogTag=await BlogTags.find({}).populate("blogs")
        res.json(blogTag)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}

export const updateBlogTag=async(req,res)=>{
    try {
        const {id}=req.params
        const blogTag=await BlogTags.findByIdAndUpdate(id,req.body)
        res.status(200).json("updated")
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}


export const deleteBlogTag=async(req,res)=>{
    try {
        const {id}=req.params
        const blogTag=await BlogTags.findByIdAndDelete(id)
        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}


export const getByIdBlogTag=async(req,res)=>{
    try {
        const {id}=req.params
        const blogTag=await BlogTags.findById(id).populate("blogs")
        res.json(blogTag)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}