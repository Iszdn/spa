import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserProvider from './context/userContext.jsx'
// import BookingProvider from './context/BookingContext.jsx'
import './i18n';
import BookingProvider from './context/BookingContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BookingProvider>
     <UserProvider> 
     <App />
    </UserProvider>
    </BookingProvider>
   
  
  </React.StrictMode>,
)
