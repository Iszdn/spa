import React from 'react'
import { Helmet } from 'react-helmet-async'
import Header from '../../components/HomeComponents/Header'
import Marka from '../../components/HomeComponents/MarkaSlider'
import Diamond from '../../components/HomeComponents/DiamondColllection'
import Discover from '../../components/HomeComponents/DiscoverBeauty'
import PlayVideo from '../../components/HomeComponents/PlayVideo'
import GridSection from '../../components/HomeComponents/GridSection'
import Testimonials from '../../components/HomeComponents/Testimonials'
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
    </>
    </>
    
  )
}

export default HomePage