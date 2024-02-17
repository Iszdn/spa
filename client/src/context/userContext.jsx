import { createContext, useEffect, useState } from "react";
import useLOcalStorage from "../hooks/useLOcalStorage";
import { jwtDecode } from "jwt-decode"
export const UserContext=createContext()


const UserProvider = ({children}) => {
  const [token, setToken] = useLOcalStorage('token',"")
const [user, setUser] = useLOcalStorage("user")






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