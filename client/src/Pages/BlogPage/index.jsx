import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import WhereAreYou from '../../components/WhereAreYou';
import BlogsCard from '../../components/BlogCards';
import axios from 'axios';
import './index.scss';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [tag, setTag] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  async function getCategory() {
    const res = await axios(`http://localhost:5000/blogCategory`);
    setCategory(res.data);
  }

  async function getTag() {
    const res = await axios(`http://localhost:5000/blogTag`);
    setTag(res.data);
  }

  async function getData() {
    const res = await axios('http://localhost:5000/blog');
    setData(res.data);
    setLoading(false);
  }

  async function getGallery() {
    const res = await axios('http://localhost:5000/gallery');
    setGallery(res.data);
    
  }

  useEffect(() => {
    getData();
    getCategory();
    getTag();
    getGallery();
  }, []);

  // Filter blog posts based on selected category and tag
  const filteredData = data.filter(blog => {
    if (selectedCategory && selectedCategory !== 'All') {
      return blog.blogCategory.some(cat => cat.blogCategoryName === selectedCategory);
    }
    return true;
  }).filter(blog => {
    if (selectedTag && selectedTag !== 'All') {
      return blog.tag.some(t => t.blogTagsName === selectedTag);
    }
    return true;
  });

  return (
    <>
      <Helmet>
        <title>BlogPage</title>
      </Helmet>
      <>
        <WhereAreYou title="Blog" curent="Blog" />
        <div className="bloga">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="fil">
                  <div className="filtersr">
                    <h4>Categories</h4>
                    <ul>
                      <li key="All" onClick={() => setSelectedCategory(null)}>All</li>
                      {category.map(x => (
                        <li key={x._id} onClick={() => setSelectedCategory(x.blogCategoryName)}>
                          {x.blogCategoryName}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="filtersr">
                    <h4>Tags</h4>
                    <div className="tags">
                      <Link key="All" onClick={() => setSelectedTag(null)}>All</Link>
                      {tag.map(x => (
                        <Link key={x._id} onClick={() => setSelectedTag(x.blogTagsName)}>
                          {x.blogTagsName}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="filtersr">
                    <h4>Recent Post</h4>
                    <ul>
                      {data.slice(0,3).map(blog => (
                        <li key={blog._id}>
                          <img src={blog.image} alt={blog.title} />
                          <h5>{blog.title}</h5>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* <div className="filtersr">
                    <h4>Gallery</h4>
                    <div className="galleries">
                      {gallery.map(x => (
                        <div key={x._id} className="gallery">
                          <img src={x.image} alt="" />
                        </div>
                      ))}
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="col-lg-9">
                <div className="container">
                  <div className="row">
                    {loading ? (
                      <span className="loader"></span>
                    ) : (
                      filteredData.map(x => (
                        <div key={x._id} className="col-lg-6 col-md-6 col-12">
                          <BlogsCard {...x} />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default BlogPage;
