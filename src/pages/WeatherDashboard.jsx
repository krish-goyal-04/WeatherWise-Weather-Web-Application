import { RefreshCcw } from "lucide-react";
import {Button} from "../components/ui/button"
const WeatherDashboard = ()=>{
    return(
        <div>
            {/*Favouraite cities */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight">Current Location</h1>
                <Button variant={'outline'} size={'icon'}>
                    <RefreshCcw className="h-4 w-4" />
                </Button>
            </div>
            {/* Current and Hourly weather */}
        </div>
    )
}
export default WeatherDashboard;