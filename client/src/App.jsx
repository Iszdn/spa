
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
import AdminPage from "./Pages/AdminPage/index.jsx";
import LAyoutAdmin from "./components/AdminComponents/AdminLayout/LayoutAdmin/index.jsx";
import UsersPage from "./Pages/AdminPages/UsersPage/index.jsx";
import TeamAdmin from "./Pages/AdminPages/TeamPage/index.jsx";
import ServiceAdmin from "./Pages/AdminPages/SErvicesPage/index.jsx";
import AddUser from "./components/AdminAddComp/AddUserForm/index.jsx";
import AddService from "./components/AdminAddComp/AddServiceFor/index.jsx";
import AddTeam from "./components/AdminAddComp/AddTeamForm/index.jsx";
import BlogAdmin from "./Pages/AdminPages/BlogAdminPage/index.jsx";
import SpaCategoryAdmin from "./Pages/AdminPages/SpaCategoryPage/index.jsx";
import FaqAdmin from "./Pages/AdminPages/FaqPage/index.jsx";
import AddFaq from "./components/AdminAddComp/AddFaq/index.jsx";
import GalleryAdmin from "./Pages/AdminPages/GalleryPagee/index.jsx";
import AddBlog from "./components/AdminAddComp/AddBlog/index.jsx";
import AddSpaCategory from "./components/AdminAddComp/AddSpaCategory/index.jsx";
import PrivateRoute from "./Routes/PrivateRoote/index.jsx";
import { useEffect, useState } from "react";
import MarkaAdmin from "./Pages/AdminPages/MarkaPage/index.jsx";
import LogoAdmin from "./Pages/AdminPages/LogoPage/index.jsx";
import ProfileIconAdmin from "./Pages/AdminPages/ProfileIcon/index.jsx";

function App() {

const [loading, setLoading] = useState(true)

useEffect(() => {
 const timeOut=setTimeout(()=>{
  setLoading(false)
 },3000)
return()=>clearTimeout(timeOut)
}, [])

  const helmetContext = {};



  return (
    <HelmetProvider context={helmetContext}>

       <BrowserRouter>

       <ScrollToTop/>
       {
        loading ? <div className="load"><img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/lilac-Gif-Animation.gif" alt="" /></div> :
        <Routes>
        <Route path="/" element={<Layout/>}>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/contactus" element={<ContactUs/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/faq" element={<FaqPage/>}/> 
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<Register/>}/>
      
        
        <Route path="/blog" element={<BlogPage/>}/>
        <Route path="/blog/:id" element={<BlogDetails/>}/>
        <Route element={<PrivateRoute roles={["admin","user"]}/>}>
        <Route path="/account" element={<Account/>}/>
        <Route path="/services" element={<OurServicePage/>}/>
        <Route path="/services/:categoryId" element={<CategoryPage/>}/>
        </Route>
      

        </Route>

        <Route path="/*" element={<NotFound/>}/>
<Route element={<PrivateRoute roles={["admin"]}/>}>
       
        <Route path="/admin" element={<LAyoutAdmin/>}>
        
         <Route path="/admin" element={<AdminPage/>}/>
         <Route path="/admin/users" element={<UsersPage/>}/>
         <Route path="/admin/teams" element={<TeamAdmin/>}/>
         <Route path="/admin/services" element={<ServiceAdmin/>}/>
         <Route path="/admin/blogs" element={<BlogAdmin/>}/>
         <Route path="/admin/adduser" element={<AddUser/>}/>
         <Route path="/admin/addserv" element={<AddService/>}/>
         <Route path="/admin/addblog" element={<AddBlog/>}/>
         <Route path="/admin/addteam" element={<AddTeam/>}/>
         <Route path="/admin/addSpaCategory" element={<AddSpaCategory/>}/>
         <Route path="/admin/spaCategory" element={<SpaCategoryAdmin/>}/>
         <Route path="/admin/faq" element={<FaqAdmin/>}/>
         <Route path="/admin/gallery" element={<GalleryAdmin/>}/>
         <Route path="/admin/marka" element={<MarkaAdmin/>}/>
         <Route path="/admin/logo" element={<LogoAdmin/>}/>
         <Route path="/admin/addfaq" element={<AddFaq/>}/>
         <Route path="/admin/profileIcon" element={<ProfileIconAdmin/>}/>
         </Route>
         </Route>
      </Routes>
       }
      
    </BrowserRouter>
    </HelmetProvider>
   
  )
}

export default App
