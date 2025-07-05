import { Github, Linkedin, LinkedinIcon } from "lucide-react";

const Footer = ()=>{
    return(
        <div className="border-t backdrop-blur flex">
            <div className=" flex flex-col items-center w-full text-center py-12 supports-[backdrop-filter]:bg-background/60">
                Made By Krish!!
                <div className="flex gap-4 mt-4">
                <span><a href="https://github.com/krish-goyal-04/WeatherWise-Weather-Web-Application"><Github /></a></span>
                <span><a href="https://www.linkedin.com/in/krish-goyal-15666b245/"><Linkedin /></a> </span>
                </div>
            </div>
            
        </div>
    )
}
export default Footer;