import { Gauge,Sunrise,Sunset,Compass,Cloudy,Tornado } from "lucide-react"
import{Card,CardHeader,CardContent,CardTitle} from "../components/ui/card"
import {format} from "date-fns"
const WeatherDetails =({weatherData})=>{
    const {sys:{sunrise,sunset},wind:{deg,gust},main:{pressure},clouds:{all:clouds}}=weatherData

    const formatData = (value)=>{
        return format(new Date(value*1000),"h:mm a")
    }
    const getWindDirection = (deg)=>{
        const directions = ["North","North-East","East","South-East","South","South-West","West","North-West"]
        const index = Math.round((((deg%=360)<0?deg+360:deg)/45)%8)
        return directions[index]
    }

    const details = [
        {
            title:"Sunrise",
            icon:Sunrise,
            value:formatData(sunrise),
            color:"text-orange-500"
        },
        {
            title:"Sunset",
            icon:Sunset,
            value:formatData(sunset),
            color:"text-red-500"
        },
        {
            title:"Wind Direction",
            icon:Compass,
            value:` ${getWindDirection(deg)} ${deg}°`,
            color:"text-green-500"
        },
        {
            title:"Pressure",
            icon:Gauge,
            value:`${pressure} hPa`,
            color:"text-blue-500"
        },
        {
            title:"Cloudiness",
            icon:Cloudy,
            value:`${clouds}% `,
            color:"text-slate-200"
        },
         {
            title:"Wind Gust",
            icon:Tornado,
            value:`${Math.round(gust)} m/s `,
            color:"text-cyan-500"
        },
    ]
    return(
        <Card className="flex-1 h-fit" >
            <CardHeader>
                <CardTitle className="text-xl">Weather Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    {details.map((detail,index)=>{
                        return(
                            <div key={index} className="flex items-center gap-3 rounded-lg border p-4  ">
                                <detail.icon className={`${detail.color}`}/>
                                <div className="flex flex-col">
                                    <p className="font-bold">{detail.title}</p>
                                    <p>{detail.value}</p>
                                </div>
                                
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
export default WeatherDetails