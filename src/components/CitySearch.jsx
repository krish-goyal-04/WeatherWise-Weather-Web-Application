import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

import {Button} from "./ui/button"
import { useState } from "react"
import { Search } from "lucide-react"


const CitySearch = ()=>{
    const [open,setOpen]=useState(false)
    return(
        <>
        <Button variant="outline" onClick={()=>setOpen(true)} className=" flex text-sm md:w-40 lg:w-60">
            <Search />
            Search City</Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Search Cities..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                <CommandItem>Calendar</CommandItem>
                <CommandItem>Search Emoji</CommandItem>
                <CommandItem>Calculator</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                <CommandItem>Profile</CommandItem>
                <CommandItem>Billing</CommandItem>
                <CommandItem>Settings</CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
        </>
    )
}
export default CitySearch