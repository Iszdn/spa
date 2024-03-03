import  { createContext, useState } from "react";


export const BookingContext=createContext()

const BookingProvider = ({children}) => {
    const [bookinInfo, setBookinInfo] = useState(null)
const [selectedServicePrice, setSelectedServicePrice] = useState(null)

const data={
    bookinInfo, setBookinInfo,selectedServicePrice, setSelectedServicePrice
}

  return (
    <BookingContext.Provider value={data}>
{children}
    </BookingContext.Provider>
  )
}

export default BookingProvider