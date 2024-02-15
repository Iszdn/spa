
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Layout from "./Layout/Layout";
import HomePage from "./Pages/HomePage";
import Register from "./Pages/Register";
import LoginPage from "./Pages/LoginPage";
import ContactUs from "./Pages/ContactUs";
import AboutPage from "./Pages/AboutPage";
import Account from "./Pages/AccountPage";
import BlogPage from "./Pages/BlogPage";
import BlogDetails from "./Pages/BlogDetails";
import ScrollToTop from "./components/ScrollToTop";
import OurServicePage from "./Pages/OurServicePage";
import CategoryPage from "./Pages/SpaServicesCategory.jsx";
import NotFound from "./Pages/NotFound/index.jsx";
import FaqPage from "./Pages/FaqPage/index.jsx";

function App() {
  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>

       <BrowserRouter>
       <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/contactus" element={<ContactUs/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/faq" element={<FaqPage/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/services" element={<OurServicePage/>}/>
        <Route path="/services/:categoryId" element={<CategoryPage/>}/>
        <Route path="/blog" element={<BlogPage/>}/>
        <Route path="/blog/:id" element={<BlogDetails/>}/>

        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<Register/>}/>
      

        </Route>
        <Route path="*" element={<NotFound/>}/>
         
      </Routes>
    </BrowserRouter>
    </HelmetProvider>
   
  )
}

export default App
