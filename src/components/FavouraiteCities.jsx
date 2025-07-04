import useFavouraites from "../hooks/useFavouraites"
import {ScrollArea,ScrollBar} from "./ui/scroll-area"
import FavouraiteCityTablet from "./FavouraiteCityTablet"

const FavouraiteCities = ()=>{
    const {favouraites,removeFavouraites} = useFavouraites()
    if(favouraites.length<=0)return null
    return(
        <>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Favourites</h1>
        <ScrollArea className="w-full pb-4" orientation="horizontal">
            <div className="w-max flex gap-4">
                {favouraites.map((city)=>{
                    return <FavouraiteCityTablet key={city.id} data={city} removeFavouraites={removeFavouraites} />
                })}
            </div>
             <ScrollBar orientation="horizontal" />
        </ScrollArea>
        </>
    )
}
export default FavouraiteCities