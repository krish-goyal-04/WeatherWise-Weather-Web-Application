import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider";
import { Sun ,Moon } from "lucide-react";
import CitySearch from "./CitySearch";


const Header = ()=>{

    const {theme,setTheme} = useTheme()
    const isDark = (theme==='dark')
    return(
        <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2" >
            <div className="container mx-auto flex h-16 items-center justify-between px-4">

                <Link to="/"> <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-transparent bg-clip-text dark:from-green-300 dark:via-blue-400 dark:to-purple-500">
                Klimate</h1>
                </Link>

                <div className="flex gap-4">
                    <div>
                        <CitySearch />
                    </div>
                    
                    <div onClick={()=>setTheme(isDark?'light':'dark')} className={`cursor-pointer flex items-center transition-transform duration-500 ${isDark?"rotate-180":"rotate-0"}`}>
                        {isDark?(
                            <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all"  />):
                            (<Moon className="h-6 w-6 text-black rotate-0 transition-all"/>)}
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Header;