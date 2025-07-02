import { useEffect, useState } from "react"

const useGetLocation = ()=>{
    const [locationData, setLocationData] = useState({
        coordinates:null,
        error:null,
        isLoading:true
    })

    const getLocation = ()=>{
        setLocationData((prev)=>({
            ...prev,
            error:null,
            isLoading:true,
        }))
        if(!navigator.geolocation){
            setLocationData({
                coordinates:null,
                isLoading:false,
                error:"Geolocation is not supported in your browser!"/*Can add some page here */
            })
            return
        }
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                setLocationData({
                    coordinates:{
                    lat:position.coords.latitude,
                    lon:position.coords.longitude,
                },
                error:null,
                isLoading:false
            })},
            (error)=>{
                let errorMessage;
                console.log(error);
                /*Add switch statements fro errro handling */
                setLocationData({
                    coordinates:null,
                    error:"Error(need to add some content)",
                    isLoading:false
                })},
                {
                    timeout:5000,
                    maximumAge:0,
                    enableHighAccuracy:true,
                }
        )
    }

    useEffect(()=>{
        getLocation()
    },[])

    return{...locationData,getLocation}
}
export default useGetLocation;