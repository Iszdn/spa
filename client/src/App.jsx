
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Layout from "./Layout/Layout";
import HomePage from "./Pages/HomePage";
import Register from "./Pages/Register";
import LoginPage from "./Pages/LoginPage";
import ContactUs from "./Pages/ContactUs";

function App() {
  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>

       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/contactus" element={<ContactUs/>}/>

        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<Register/>}/>
      

        </Route>
      </Routes>
    </BrowserRouter>
    </HelmetProvider>
   
  )
}

export default App
