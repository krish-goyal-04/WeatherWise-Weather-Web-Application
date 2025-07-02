import { useSearchParams } from "react-router-dom"
import {API_CONFIG} from "./config"

class WeatherAPI{
    createURL(endpoint,params){
        const searchParams = new useSearchParams({
            appid:API_CONFIG.API_KEY,
            ...params
        })
        return `${endpoint}?${searchParams.toString()}`
    }

    async fetchData(url){
        const response = await fetch(url)
        if(!response.ok){
            throw new Error(`Weather API Error:${response.statusText}`)
        }
        return response.json()
    }

    async getCurrentWeather({lat,lon}){
        const url = this.createURL(`${API_CONFIG.BASE_URL}/weather`,{
            lat:lat.toString(),
            lon:lon.toString(),
            units:"metric"})
        return this.fetchData(url)
    }

    async getWeatherForecast({lat,lon}){
        const url = this.createURL(`${API_CONFIG.BASE_URL}/forecast`,{
            lat:lat.toString(),lon:lon.toString(),units:"metric"})
        return this.fetchData(url)
    }

    async reverseGeocode({lat,lon}){
        const url = this.createURL(`${API_CONFIG.GEO}/reverse`,{
            lat:lat.toString(),
            lon:lon.toString(),
            limit:1
        })
        return this.fetchData(url)
    }
}

export const weatherAPI = new WeatherAPI()