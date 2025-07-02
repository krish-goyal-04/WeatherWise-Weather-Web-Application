import {Card,CardContent} from "@/components/ui/card"


const CurrentWeather = ({weatherData,locationName})=>{
    const {
        main:{feels_like,humidity,pressure,temp,temp_max,temp_min},
        wind:{speed},
        weather:[{main:weatherMain,description}]
    } = weatherData
    return(
        <div>
            CurrentWeather
            <Card>
                <CardContent>
                    <p>Card Content</p>
                    <img src="https://flagsapi.com/IN/flat/24.png"></img>
                </CardContent>
            </Card>
        </div>
    )
}
export default CurrentWeather;