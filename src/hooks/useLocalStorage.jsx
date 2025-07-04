import { useEffect, useState } from "react"


const useLocalStorage = (key,initialValue)=>{
    const [storedvalue,setStoredValue] = useState(()=>{
        try {
            const items = window.localStorage.getItem(key)
            return items?JSON.parse(items):initialValue
        } catch (error) {
            console.error(error)
            return initialValue
        }
    })

    useEffect(()=>{
        try {
            window.localStorage.setItem(key,JSON.stringify(storedvalue))
        } catch (error) {
            console.error(error)
            return initialValue
        }
    },[key,storedvalue])
    return [storedvalue,setStoredValue]
}
export default useLocalStorage