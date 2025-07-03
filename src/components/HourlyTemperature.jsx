import { LineChart, ResponsiveContainer,Line, XAxis, YAxis, Tooltip } from "recharts"
import {Card, CardContent, CardHeader, CardTitle} from "./ui/card"
import {format} from "date-fns"

const HourlyTemperature = ({dataList})=>{
    const chartData = dataList.list.slice(0,8).map((item)=>({
        time:format(new Date(item.dt*1000),'ha'),
        temp: Math.round(item.main.temp),
        feels_like: Math.round(item.main.feels_like)
    }))
    return(
        <Card className="flex-1" >
            <CardHeader>
                <CardTitle className="text-xl">Today's Weather</CardTitle>
            </CardHeader>
            <CardContent>
                
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width={"100%"} height={"100%"}>
                         <LineChart data={chartData}>
                            <XAxis dataKey="time" fontSize={15} stroke="#888888" tickLine={false} axisLine={false}/>
                            <YAxis dataKey="temp" fontSize={17} stroke="#888888" tickLine={false} axisLine={false}
                            tickFormatter={(value)=>`${value}°`}/>
                            <Line type="monotone" dataKey="temp" stroke="#0000CD" strokeWidth={2} />
                            <Line type="monotone" dataKey="feels_like" stroke="#64748b" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                            <Tooltip content={({active,payload})=>{
                                if(active && payload && payload.length){
                                    return(
                                        <div className="bg-gray-700 p-2 rounded-2xl shadow-2xl">
                                            <div>
                                                <span>Temperature: </span>
                                                <span>{payload[0].value}°</span>
                                            </div>
                                            <div>
                                                <span>Feels Like: </span>
                                                <span>{payload[1].value}°</span>
                                            </div>
                                            
                                        </div>
                                    )
                                }
                                return null
                            }} />
                         </LineChart>
                         
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
export default HourlyTemperature