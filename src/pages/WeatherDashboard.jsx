import { AlertTriangle, RefreshCcw } from "lucide-react";
import {Button} from "../components/ui/button"
import useGetLocation from "../hooks/useGetLocation";
import LoadingSkeleton from "../components/LoadingSkeleton"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"

const WeatherDashboard = ()=>{
    const {coordinates,error, isLoading,getLocation} = useGetLocation()

    const handleRefresh= ()=>{
        getLocation()
        if(coordinates){
            /** */
        }
    }
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
    return(
        <div>
            {/*Favouraite cities */}
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight">Current Location</h1>
                <Button variant={'outline'} size={'icon'} onClick={handleRefresh}>
                    <RefreshCcw className="h-4 w-4" />
                </Button>
            </div>
            {/* Current and Hourly weather */}
        </div>
    )
}
export default WeatherDashboard;