import Blogs from "../models/blog.js";

export const createBlog=async(req,res)=>{
    try {
        const blog=new Blogs({...req.body})
        await blog.save()
        res.status(200).json("created")
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getBlog=async(req,res)=>{
    try {
        const blog=await Blogs.find({})
        res.json(blog)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}

export const updateBlog=async(req,res)=>{
    try {
        const {id}=req.params
        const blog=await Blogs.findByIdAndUpdate(id,req.body)
        res.status(200).json("updated")
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}


export const deleteBlog=async(req,res)=>{
    try {
        const {id}=req.params
        const blog=await Blogs.findByIdAndDelete(id)
        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}


export const getByIdBlog=async(req,res)=>{
    try {
        const {id}=req.params
        const blog=await Blogs.findById(id)
        res.json(blog)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}