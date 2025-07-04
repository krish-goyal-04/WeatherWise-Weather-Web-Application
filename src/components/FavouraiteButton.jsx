import { Star } from "lucide-react"
import useFavouraites from "../hooks/useFavouraites"
import {Button} from "./ui/button"
import { toast } from "sonner"

const FavouraiteButton = ({data})=>{
    const{addToFavouraites,removeFavouraites,isFavouraite} = useFavouraites()
    const isCurrentlyFavouraite = isFavouraite(data.coord.lat,data.coord.lon)


    const handleToggleFavouraite = ()=>{
        if(isCurrentlyFavouraite){
            removeFavouraites.mutate(`${data.coord.lat}-${data.coord.lon}`)
            toast.error(`Removed ${data.name.cityName} from Favourites`)

        }
        else{
            addToFavouraites.mutate({
                name:data.name,
                lat:data.coord.lat,
                lon:data.coord.lon,
                country:data.sys.country
            })
            toast.success(`Added ${data.name.cityName} to Favourites`)
        }
    }



    return <Button variant={isCurrentlyFavouraite?"default":"outline"} size={"icon"}
        className={isCurrentlyFavouraite?"bg-yellow-500 hover:bg-yellow-600":""}
        onClick={handleToggleFavouraite}>
        <Star className={`h-4 w-4 ${isCurrentlyFavouraite?"fill-content" : ""}`}/>
    </Button>
}
export default FavouraiteButton