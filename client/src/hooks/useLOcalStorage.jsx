import React from 'react'

function useLOcalstorage(storagename, defaulValue=[]) {

    const [data, setData] = React.useState(localStorage.getItem(storagename) ? JSON.parse(localStorage.getItem(storagename)) : defaulValue)

    React.useEffect(() => {
        localStorage.setItem(storagename, JSON.stringify(data))
    }, [data])

   

    return [data, setData]
}

export default useLOcalstorage