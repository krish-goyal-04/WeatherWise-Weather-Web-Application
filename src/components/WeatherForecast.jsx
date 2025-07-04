import { format } from "date-fns"
import { Card,CardContent, CardHeader,CardTitle } from "./ui/card"
import { ArrowUp,ArrowDown } from "lucide-react"

const WeatherForecast = ({forecastData})=>{
    const data = forecastData.list.slice(8).filter(item=>item.dt_txt.includes("12:00:00")||item.dt_txt.includes("00:00:00"))

    const formatDate = (val)=>{
        return format(new Date(val*1000),"dd-MM-yyyy")
    }
    const formatTime = (val)=>{
        return format(new Date(val*1000),"h a")
    }
    return (
        <Card className="lg:w-[65%] w-full p-4 mx-auto">
            <CardHeader>
            <CardTitle className="text-xl  ">5-Day Weather Forecast</CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.map((item, index) => (
                <Card key={index} className="rounded-2xl border shadow-md p-4 bg-muted/20">
                <CardContent className="space-y-3">
                    {/* Date & Time */}
                    <div className="flex justify-between text-l text-muted-foreground font-medium">
                    <span>{formatDate(item.dt)}</span>
                    <span>{formatTime(item.dt)}</span>
                    </div>

                    {/* Temperature Info */}
                    <div className="space-y-2">
                    <div className="text-xl font-semibold text-primary">
                        {Math.round(item.main.temp)}°C
                    </div>

                    <div className="flex justify-between text-lg">
                        <span className="flex items-center gap-1 text-blue-500 font-medium">
                        <ArrowDown className="h-4 w-4" />
                        {Math.round(item.main.temp_min)}°
                        </span>
                        <span className="flex items-center gap-1 text-red-500 font-medium">
                        <ArrowUp className="h-4 w-4" />
                        {Math.round(item.main.temp_max)}°
                        </span>
                    </div>
                    </div>

                    {/* Feels Like */}
                    <div className="text-md text-muted-foreground">
                    Feels like: <span className="font-medium">{Math.round(item.main.feels_like)}°C</span>
                    </div>
                </CardContent>
                </Card>
            ))}
            </CardContent>
        </Card>
);
}
export default WeatherForecast