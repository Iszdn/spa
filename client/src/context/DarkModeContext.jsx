import { createContext } from "react";
import UseDarkMode from "../hooks/UseDarkMode";

export const DarkModeContext = createContext()


const DarkModeProvider = ({children}) => {
    const [theme,handleDarkMode] = UseDarkMode()

    const data = {
        theme, handleDarkMode
    }
  return (
    <>
    <DarkModeContext.Provider value={data}>
        {children}
    </DarkModeContext.Provider>
    </>
  )
}

export default DarkModeProvider