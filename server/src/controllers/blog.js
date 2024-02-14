import Blogs from "../models/blog.js";
import blogSchema from "../models/blogCategory.js";
import tagSchema from "../models/blogtag.js";




// Create a controller function to handle the blog post
export const createBlog = async (req, res) => {
  try {
    const { image, title, description, name, tagId, blogCategoryId } = req.body;

    const newBlogPost = new Blogs({
      image,
      title,
      description,
      name,
      tag:tagId,
      blogCategory: blogCategoryId, 
    });

    
    await newBlogPost.save();

   
    await blogSchema.findByIdAndUpdate(blogCategoryId, {
      $push: { blogs: newBlogPost._id }, 
    });

    await tagSchema.findByIdAndUpdate(tagId, {
      $push: { blogs: newBlogPost._id }, 
    });

    
    res.status(201).json({ message: 'Blog post created successfully', blogPost: newBlogPost });
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



export const getBlog = async (req, res) => {
  try {
    const blog = await Blogs.find({}).populate("blogCategory","tag")
    res.json(blog);
  } catch (error) {
    res.status(500).json({ messsage: error });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blogs.findByIdAndUpdate(id, req.body);
    res.status(200).json("updated");
  } catch (error) {
    res.status(500).json({ messsage: error });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blogs.findByIdAndDelete(id);
    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json({ messsage: error });
  }
};

export const getByIdBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blogs.findById(id).populate("blogCategory","tag")
    res.json(blog);
  } catch (error) {
    res.status(500).json({ messsage: error });
  }
};
