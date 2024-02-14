import React from 'react'
import { Link } from 'react-router-dom'

const WhereAreYou = ({title,curent}) => {
  return (
    <section className='main-title-section-wrapper '>
    <div className='main-title-section-container'>
    <div className="container">
      <div className="main-title-section">
        <h1>
       {title}
        </h1>
      </div>
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span className='breadcrumb-default-delimiter'>
        </span>
        <span className='current'>{curent}</span>
      </div>
    </div>
    </div>
    <div className="main-title-section-bg">
    
    </div>
        </section>
  )
}

export default WhereAreYou