import React from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../../components/HomeComponents/Header'
import Marka from '../../components/HomeComponents/MarkaSlider'
import Diamond from '../../components/HomeComponents/DiamondColllection'
import Discover from '../../components/HomeComponents/DiscoverBeauty'
import PlayVideo from '../../components/HomeComponents/PlayVideo'
import GridSection from '../../components/HomeComponents/GridSection'
import Testimonials from '../../components/HomeComponents/Testimonials'
import NewsAndBlog from '../../components/HomeComponents/NewsAndBlogs'
import Instagram from '../../components/HomeComponents/Instagram'
const HomePage = () => {
  return (
    <>
    <Helmet>
      <title>HomePage</title>
    </Helmet>
    <>
    <Header/>
    <Marka/>
    <GridSection/>
    <Diamond/>
    <Discover/>
    <PlayVideo/>
    <Testimonials/>
    <NewsAndBlog/>
    <Instagram/>
    </>
    </>
    
  )
}

export default HomePage