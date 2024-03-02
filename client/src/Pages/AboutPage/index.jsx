import React from 'react'
import { Helmet } from 'react-helmet-async'
import WhereAreYou from '../../components/WhereAreYou'
import Discover from '../../components/HomeComponents/DiscoverBeauty'
import HowWeMake from '../../components/AboutComponents/HowWeMake'
import Effective from '../../components/AboutComponents/Effective'
import OurTeam from '../../components/AboutComponents/OurTeam'
import Luctiory from '../../components/AboutComponents/Luctirios'
const AboutPage = () => {
  return (
    <>
    <Helmet>
      <title>About</title>
    </Helmet>
    <>
    <WhereAreYou title="About" curent="about"/>
    <Effective/>
    <HowWeMake/>
    <Discover/>
    <OurTeam/>
    <Luctiory/>
    
    </>
    </>
    
  )
}

export default AboutPage