import {Card, CardContent, CardHeader, CardTitle} from "./ui/card"

const HourlyTemperature = ({dataList})=>{
    const chartData = dataList.slice(0,8)
    return(
        <Card className="flex-1" >
            <CardHeader>
                <CardTitle>Today's Weather</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
        </Card>
    )
}
export default HourlyTemperature