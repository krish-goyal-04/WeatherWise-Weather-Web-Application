import {Card,CardContent} from "@/components/ui/card"
import { ArrowDown, ArrowUp, Droplet, Droplets, Gauge, Wind } from "lucide-react"


const CurrentWeather = ({weatherData,locationName})=>{
    const formatTemp= (t)=>{
        return `${Math.round(t)}`
    }
    const {
        main:{feels_like,humidity,pressure,temp,temp_max,temp_min},
        wind:{speed},
        weather:[{main:weatherMain,description,icon}],
    } = weatherData
    return(
        <div>
            <Card className="overflow-hidden">
                <CardContent className="p-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <h2 className="text-2xl font-bold tracking-tighter">{locationName.name} </h2>
                                </div>
                                {locationName?.state &&(<span className="text-muted-foreground">{locationName.state}, {locationName.country}</span>)}
                            </div>
                            <div className="flex items-center gap-2  ">
                                <p className="text-6xl font-bold tracking-tighter">{formatTemp(temp)}°</p>
                                <div className="space-y-1">
                                    <p className="text-m">Feels like {formatTemp(feels_like)}°</p>
                                    <div className="flex gap-3  font-medium">
                                        <span className="flex items-center gap-1 text-blue-500">
                                            <ArrowDown className="h-3 w-3"/>{formatTemp(temp_min)}°
                                        </span>
                                        <span className="flex items-center gap-1 text-red-500">
                                            <ArrowUp className="h-3 w-3"/>{formatTemp(temp_max)}°
                                        </span>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                <Droplet className="h-5 w-5 text-sky-500" />
                                <div className="space-y-0.5">
                                    <p className="font-medium">Humidity</p>
                                    <p className="font-medium">{humidity}%</p>
                                </div>
                                </div>
                                <div className="flex items-center gap-2">
                                <Wind className="h-5 w-5 text-sky-500" />
                                <div className="space-y-0.5">
                                    <p className="font-medium">Wind Speed</p>
                                    <p className="font-medium">{speed} m/s</p>
                                </div>
                                </div>
                                <div className="flex items-center gap-2">
                                <Gauge className="h-5 w-5 text-sky-500" />
                                <div className="space-y-0.5">
                                    <p className="font-medium">Pressure</p>
                                    <p className="font-medium">{pressure} hPa</p>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
                            <img
                            src={` https://openweathermap.org/img/wn/${icon}@4x.png`} />
                            <div className="absolute bottom-0 text-center">
                                <p className="capitalize font-medium ">{description}</p>
                            </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
export default CurrentWeather;