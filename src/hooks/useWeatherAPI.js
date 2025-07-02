import { useQuery } from "@tanstack/react-query";
import { weatherAPI } from "../api/weather";

export const useWeatherQuery = (coordinates)=>{
    return useQuery({
        queryKey:["weather",coordinates==null?{lat:0,lon:0}:coordinates],
        queryFn:()=>coordinates?weatherAPI.getCurrentWeather(coordinates):null,
        enabled:!!coordinates
    })
}

export const useForecastQuery = (coordinates)=>{
    return useQuery({
        queryKey:["forecast",coordinates==null?{lat:0,lon:0}:coordinates],
        queryFn:()=>coordinates?weatherAPI.getWeatherForecast(coordinates):null,
        enabled:!!coordinates
    })
}


export const useReverseGeocodeQuery = (coordinates)=>{
    return useQuery({
        queryKey:["location",coordinates==null?{lat:0,lon:0}:coordinates],
        queryFn:()=>coordinates?weatherAPI.reverseGeocode(coordinates):null,
        enabled:!!coordinates
    })
}