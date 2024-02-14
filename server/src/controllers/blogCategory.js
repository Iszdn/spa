import BlogCategorys from "../models/blogCategory.js";

export const createBlogCategory=async(req,res)=>{
    try {
        const blogCategory=new BlogCategorys({...req.body})
        await blogCategory.save()
        res.status(200).json("created")
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getBlogCategory=async(req,res)=>{
    try {
        const blogCategory=await BlogCategorys.find({}).populate("blogs")
        res.json(blogCategory)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}

export const updateBlogCategory=async(req,res)=>{
    try {
        const {id}=req.params
        const blogCategory=await BlogCategorys.findByIdAndUpdate(id,req.body)
        res.status(200).json("updated")
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}


export const deleteBlogCategory=async(req,res)=>{
    try {
        const {id}=req.params
        const blogCategory=await BlogCategorys.findByIdAndDelete(id)
        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}


export const getByIdBlogCategory=async(req,res)=>{
    try {
        const {id}=req.params
        const blogCategory=await BlogCategorys.findById(id).populate("blogs")
        res.json(blogCategory)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}