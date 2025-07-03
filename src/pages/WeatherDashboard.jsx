import { AlertTriangle, RefreshCcw } from "lucide-react";
import {Button} from "../components/ui/button"
import useGetLocation from "../hooks/useGetLocation";
import LoadingSkeleton from "../components/LoadingSkeleton"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import { useWeatherQuery,useForecastQuery,useReverseGeocodeQuery } from "../hooks/useWeatherAPI";
import CurrentWeather from "../components/CurrentWeather";
import HourlyTemperature from "../components/HourlyTemperature";
import WeatherDetails from "../components/WeatherDetails"
import WeatherForecast from "../components/WeatherForecast"

const WeatherDashboard = ()=>{
    const {coordinates,error, isLoading,getLocation} = useGetLocation()

    const handleRefresh= ()=>{
        getLocation()
        if(coordinates){
            weatherQuery.refetch()
            forecastQuery.refetch()
            locationQuery.refetch()
        }
    }
    const locationQuery = useReverseGeocodeQuery(coordinates)
    const weatherQuery = useWeatherQuery(coordinates)
    const forecastQuery = useForecastQuery(coordinates)
    console.log(forecastQuery?.data)

    if(isLoading){
        return(<LoadingSkeleton />)
    }
    if(error){
        return(
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Location Error</AlertTitle>
                    <AlertDescription>
                        <p>{error}</p>
                        Session Expired!!
                        <Button onClick={getLocation} variant={"outline"} className="w-fit">Refresh</Button>
                    </AlertDescription>
            </Alert>
        )
    }
    if(!coordinates){
        return(
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Location Required</AlertTitle>
                    <AlertDescription>
                        <p>{error}</p>
                        Please enable location!!
                    </AlertDescription>
            </Alert>
        )
    }

    const locationName = locationQuery?.data?.[0];

    if(weatherQuery.error||forecastQuery.error){
         return(
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        <p>Failed to fetch data!</p>
                        <Button onClick={handleRefresh} variant={"outline"} className="w-fit">Retry</Button>
                    </AlertDescription>
            </Alert>
        )
    }

    if(!weatherQuery.data || !forecastQuery.data){
        return <LoadingSkeleton />
    }

    return(
        <div>
            {/*Favouraite cities */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight">Current Location</h1>
                <Button variant={'outline'} size={'icon'} onClick={handleRefresh} disabled={weatherQuery.isFetching||forecastQuery.isFetching}>
                    <RefreshCcw className="h-4 w-4" />
                </Button>
            </div>
            
            <div className="grid gap-2">
                <div className="flex flex-col lg:flex-row gap-3">
                    <CurrentWeather weatherData={weatherQuery.data} locationName={locationName} />
                    <HourlyTemperature dataList={forecastQuery.data} />
                </div>
                <div className="flex flex-col lg:flex-row gap-3">
                    <WeatherDetails weatherData={weatherQuery.data}/>
                    <WeatherForecast forecastData={forecastQuery.data} />
                </div>
            </div>

        </div>
    )
}
export default WeatherDashboard;