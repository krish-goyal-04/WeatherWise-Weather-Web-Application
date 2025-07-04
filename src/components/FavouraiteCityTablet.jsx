import { X} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {Button} from "./ui/button"
import { toast } from "sonner";
import {useWeatherQuery} from "../hooks/useWeatherAPI"

const FavouraiteCityTablet = (props)=>{
    const {data,removeFavouraites} = props
    const {id,lat,lon,name,country} = data
    console.log(id)
    const navigate = useNavigate()
    const {data:weatherData} = useWeatherQuery({lat,lon})
    return(
        <div
        onClick={()=>navigate(`/city/${name}?lat=${lat}&lon=${lon}`)}
        role="button"
        className="relative flex min-w-[250px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-sm"
        >
            <Button onClick={(e)=>{
                e.stopPropagation();
                removeFavouraites.mutate(id);
                toast.error(`Removed ${name} from Favourites`)
                }}
                className="absolute right-1 top-1 h-6 w-6 rounded-full p-0 hover:text-destructive-foreground "
                >
                <X className="h-4 w-4" />
            </Button>
            {weatherData?(
                <>
                <div className="flex gap-5">
                <div>
                    <img
                        src={` https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`} 
                        alt={weatherData.weather[0].description}
                        className="h-10 w-10" />
                </div>
                <div>
                    <p className="text-xl">{name.cityName}</p>
                    <p className="text-xs text-muted-foreground">{country}</p>
                </div>
                <div>
                    <p className="text-xl font-bold">{Math.round(weatherData.main.temp)}°C</p>
                    <p className="text-s capitalize text-muted-foreground">{weatherData.weather[0].description}</p>
                </div>
                </div>
                </>

            )
            :null}
        </div>
    )
}
export default FavouraiteCityTablet;