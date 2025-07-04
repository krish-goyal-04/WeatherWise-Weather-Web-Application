import {useParams, useSearchParams } from "react-router-dom"
import { useWeatherQuery,useForecastQuery} from "../hooks/useWeatherAPI";
import CurrentWeather from "../components/CurrentWeather";
import HourlyTemperature from "../components/HourlyTemperature";
import WeatherDetails from "../components/WeatherDetails"
import WeatherForecast from "../components/WeatherForecast"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import LoadingSkeleton from "../components/LoadingSkeleton"



const CityPage = ()=>{
    const [searchParams] = useSearchParams()
    const cityName = useParams()
    const lat = parseFloat(searchParams.get("lat")||0)
    const lon = parseFloat(searchParams.get("lon")||0)
    const coordinates = {lat,lon}
    const weatherQuery = useWeatherQuery(coordinates)
    const forecastQuery = useForecastQuery(coordinates)
    console.log(weatherQuery.data)
    if(weatherQuery.error||forecastQuery.error){
         return(
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        <p>Failed to fetch data!</p>
                    </AlertDescription>
            </Alert>
        )
    }
    if(!weatherQuery.data || !forecastQuery.data){
        return <LoadingSkeleton />
    }
    return(
         <div>
            <div className="flex  gap-1">
                <h1 className="text-2xl font-bold tracking-tight mb-5">{weatherQuery.data.name}, </h1>
                <span className="text-2xl font-bold tracking-tight text-muted-foreground mb-5">{weatherQuery.data.sys.country}</span>
                <div>{/*Add to favouraite */}</div>
            </div>
            
            <div className="grid gap-4">
                <div className="flex flex-col gap-4">
                    <CurrentWeather weatherData={weatherQuery.data} locationName={cityName} />
                    <HourlyTemperature dataList={forecastQuery.data} />
                </div>
                <div className="flex flex-col lg:flex-row gap-4">
                    <WeatherDetails weatherData={weatherQuery.data}/>
                    <WeatherForecast forecastData={forecastQuery.data} />
                </div>
            </div>

        </div>
        
        
    )
}
export default CityPage;