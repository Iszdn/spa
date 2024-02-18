import { createContext, useEffect, useState } from "react";
import useLOcalStorage from "../hooks/useLOcalStorage";
import { jwtDecode } from "jwt-decode"
import { getCookie, setCookie } from "../helper/cookie";
export const UserContext=createContext()


const UserProvider = ({children}) => {


  const [token, setToken] = useState(getCookie('token'))
  // console.log(token);
  console.log(getCookie("token"));
const [user, setUser] = useState(null)
// console.log(user);
useEffect(() => {

  if (token) {
      // Decode the token only if it exists and is valid
      try {
          const decodedToken = jwtDecode(token);
          setUser(decodedToken);

          setCookie('token',token)
      } catch (error) {
          console.error('Invalid token:', error.message);
          // If the token is invalid, clear it from localStorage and setUser to null
          // localStorage.removeItem('token');
                setUser(null);
               setCookie('token',null)
            }
        } else {
            // If no token exists, setUser to null
            setUser(null);
        }
    }, [token]);

  const data={
    token,setToken,user, setUser
  }
  return (
    <UserContext.Provider value={data}>
{children}
    </UserContext.Provider>
  )
}

export default UserProvider