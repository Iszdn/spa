import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./index.scss"
const Verify = () => {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token')
  useEffect(() => {
    if (token) {
      postdu(token);
    }
  }, [token]);

  async function postdu(token) {
    try {
      const res = await axios.post("http://localhost:8000/users/verify", { token });
      console.log("Response:", res.data); 
    } catch (error) {
      console.log("Error:", error.message);
    }
  }

  return <div className="verify"><h3>Verified!</h3></div>;
};

export default Verify;