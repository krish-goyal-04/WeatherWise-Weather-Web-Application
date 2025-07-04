import {Command,CommandDialog,CommandEmpty,CommandGroup,CommandInput,CommandItem,CommandList,CommandSeparator,CommandShortcut,} from "@/components/ui/command"

import {Button} from "./ui/button"
import { useState } from "react"
import { Loader2, Search } from "lucide-react"
import {useLocationSearchQuery} from "../hooks/useWeatherAPI"
import {  useNavigate } from "react-router-dom"


const CitySearch = ()=>{
    const navigate = useNavigate()
    const [open,setOpen]=useState(false)
    const [query,setQuery] = useState("")
    const {data, isLoading} = useLocationSearchQuery(query)
    //console.log(data)

    const handleSelect = (cityData)=>{
        const [lat,lon,name,country] = cityData.split("|")
        setOpen(false)
        navigate(`city/${name}??lat=${lat}&lon=${lon}`)
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

                <CommandSeparator />

                <CommandGroup heading="Recent Searches">
                    <CommandItem>Profile</CommandItem>
                </CommandGroup>

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