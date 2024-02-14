import Blogs from "../models/blog.js";
import blogSchema from "../models/blogCategory.js";
import tagSchema from "../models/blogtag.js";
import upload from "../middleware/multer.js";
import cloudinary from "../utils/cloudinary.js";



// Create a controller function to handle the blog post
export const createBlog = async (req, res) => {
  try {
    upload.fields([{name:'image'}])(req, res, async function (err) {
      if (err) {
        console.error(err);
        return res.status(400).json({ message: err.message });
      }
    const { image, title, description, name, tagId, blogCategoryId } = req.body;
    const BlogResult = req.files["image"][0];
    const BlogUpload = cloudinary.uploader.upload(BlogResult.path, { folder: "Blog" });

    const [BlogResponse] = await Promise.all([BlogUpload]);

    const newBlogPost = new Blogs({
      image:BlogResponse.secure_url,
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
  });
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

export const updateBlog=async(req,res)=>{
  try {
      upload.fields([{ name: 'image' }])(req, res, async function (err) {
          if (err) {
              console.error(err);
              return res.status(400).json({ message: err.message });
          }
          try {
              const updatedBlog = await Blogs.findByIdAndUpdate(req.params.id, {...req.body}, { new: true });

              if (updatedBlog) {
                  const { image } = req.body;

                  if (req.files["image"]) {
                      const BlogResult = req.files["image"][0];
                      const BlogUpload = cloudinary.uploader.upload(BlogResult.path, { folder: "Blog" });
                      const [BlogResponse] = await Promise.all([BlogUpload]);
                      updatedBlog.image = BlogResponse.secure_url;
                  }

                  if (image) updatedBlog.image = image;
                 

                  await updatedBlog.save();

                  res.status(200).json(updatedBlog); 
              } else {
                  res.status(404).json({ message: "Güncellenmek istenen Blog bulunamadı." });
              }
          } catch (error) {
              res.status(500).json({ message: error.message });
          }
      });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

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
