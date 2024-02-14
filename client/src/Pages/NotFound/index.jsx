import React from 'react'
import "./index.scss"
import { Helmet } from 'react-helmet-async'
const NotFound = () => {
  return (
    <>
    <Helmet>
      <title>NotFound</title>
    </Helmet>
    <div className='notfound'>
<div className="error-box square">
    <div className="error-box-inner">
        <h3>Oops!</h3>
        <h2>404</h2>
        <h4>Page Not Found</h4>
    </div>
</div>
    </div>
    </>
    
  )
}

export default NotFound