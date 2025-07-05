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
                error:"Geolocation is not supported in your browser!"
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

                switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage =
                    "Location permission denied. Please enable location access.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = "Location information is unavailable.";
                    break;
                case error.TIMEOUT:
                    errorMessage = "Location request timed out.";
                    break;
                default:
                    errorMessage = "An unknown error occurred.";
                }
                setLocationData({
                    coordinates:null,
                    error:errorMessage,
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