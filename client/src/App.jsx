
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Layout from "./Layout/Layout";
import HomePage from "./Pages/HomePage";

function App() {
  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>

       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route path="/" element={<HomePage/>}/>
      

        </Route>
      </Routes>
    </BrowserRouter>
    </HelmetProvider>
   
  )
}

export default App
