import React, { useEffect, useState } from 'react'

const useLOcalStorage = (key) => {
const [local, setLocal] = useState(localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [])

useEffect(() => {
localStorage.setItem(key,JSON.stringify(local))
}, [local])


function handleLocal(data) {
    setLocal(data)
  }
  
return [local,handleLocal]
}

export default useLOcalStorage