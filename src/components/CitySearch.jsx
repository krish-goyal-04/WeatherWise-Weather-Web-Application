import {Command,CommandDialog,CommandEmpty,CommandGroup,CommandInput,CommandItem,CommandList,CommandSeparator,CommandShortcut,} from "@/components/ui/command"

import {Button} from "./ui/button"
import { useState } from "react"
import { Clock, Loader2, Search, XCircle } from "lucide-react"
import {useLocationSearchQuery} from "../hooks/useWeatherAPI"
import {  useNavigate } from "react-router-dom"
import useSearchHistory from "../hooks/useSearchHistory"
import { format } from "date-fns"

const CitySearch = ()=>{
    const navigate = useNavigate()
    const [open,setOpen]=useState(false)
    const [query,setQuery] = useState("")
    const {data, isLoading} = useLocationSearchQuery(query)
    const {history,addToHistroy,clearHistory}= useSearchHistory()
    
    const formatDate=(date)=>{
        return format(new Date(date),"MMM d, h:mm a")
    }

    const handleSelect = (cityData)=>{
        const [lat,lon,name,country] = cityData.split("|")

        addToHistroy.mutate({
            query,
            name,
            lat:parseFloat(lat),
            lon:parseFloat(lon),      
            country
        })
        setOpen(false)
        navigate(`city/${name}?lat=${lat}&lon=${lon}`)
    }


    return(
        <>
        <Button variant="outline" onClick={()=>setOpen(true)} className="flex text-md md:w-40 lg:w-60"><Search />Search City</Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput
             value={query} 
             onValueChange={setQuery} 
             placeholder="Search Cities..." />
            <CommandList>
                {query.length>=3 && !isLoading && <CommandEmpty>No Cities found.</CommandEmpty>}

                <CommandGroup heading="Favouraites">
                    <CommandItem>Calendar</CommandItem>
                </CommandGroup>


                {history.length>0 && (
                    <>
                    <CommandSeparator />
                    <CommandGroup heading="Recent Searches">
                        <div className="">
                            <Button
                            variant="ghost"
                            size="sm"
                            onClick={()=>clearHistory.mutate()}
                            ><XCircle className="h-4 w-4" />Clear</Button>
                        </div>
                        {history.map((location)=>(<CommandItem
                            key={`${location.id}`}
                            value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                            onSelect={handleSelect}
                            className="flex justify-between"
                            >
                            <div className="flex">
                                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{location.name}</span>
                            {location.state && (
                            <span className="text-sm text-muted-foreground">, {location.state}</span>
                            )}
                            <span className="text-sm text-muted-foreground">, {location.country}</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground">{formatDate(location.searchedAt)}</span>
                            </div>
                        </CommandItem>)
                        )}
                    </CommandGroup>
                    </>
                )}

                <CommandSeparator />

                {data && data.length > 0 && (
                    <CommandGroup heading="Suggestions">
                        {isLoading && (
                        <div className="flex items-center justify-center p-4">
                            <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                        )}
                        {data?.map((location) => (
                        <CommandItem
                            key={`${location.lat}-${location.lon}`}
                            value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                            onSelect={handleSelect}
                        >
                            <Search className="mr-2 h-4 w-4" />
                            <span>{location.name}</span>
                            {location.state && (
                            <span className="text-sm text-muted-foreground">, {location.state}</span>
                            )}
                            <span className="text-sm text-muted-foreground">, {location.country}</span>
                        </CommandItem>
                        ))}
                    </CommandGroup>
                    )}
            </CommandList>
        </CommandDialog>
        </>
    )
}
export default CitySearch