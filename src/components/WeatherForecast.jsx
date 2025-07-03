import { format } from "date-fns"
import { Card,CardHeader,CardTitle,CardContent } from "./ui/card"

const WeatherForecast = ({forecastData})=>{
    const data = forecastData.list.slice(8)
    console.log(data)

    const formatDate = (val)=>{
        return format(new Date(val*1000),"d")
    }
    return(
        <Card>
            <div>
                
            </div>
        </Card>
    )
}
export default WeatherForecast