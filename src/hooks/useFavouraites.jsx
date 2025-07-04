import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useLocalStorage from "./useLocalStorage";


const useFavouraites = ()=>{
    const [favouraites,setFavoraites] = useLocalStorage(["favouraites"],[])
    const queryClient = useQueryClient();

    //Accessing data

    const favouraitesQuery = useQuery({
        queryKey:["favouraites"],
        queryFn:()=>favouraites,
        initialData:favouraites,
        staleTime:Infinity
    })

    const addToFavouraites =useMutation({
        mutationFn:async (fav)=>{
            const newFav={
                ...fav,
                id:`${fav.lat}-${fav.lon}}`,
                addedAt:Date.now()
            }
            const exists = favouraites.some((item)=>newFav.id===item.id)
            if(exists)return favouraites
            
            const newFavouraites = [...favouraites,newFav]
            setFavoraites(newFavouraites)
            return newFavouraites
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["favouraites"]})
        }
    })

    const removeFavouraites = useMutation({
        mutationFn:async (cityId)=>{
            const newFavouraites = favouraites.filter((city)=>city.id!==cityId)
            setFavoraites(newFavouraites)
            return newFavouraites
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["favouraites"]})
        }
    })
    return{
        favouraites:favouraitesQuery.data,
        addToFavouraites,
        removeFavouraites
    }
}
export default useFavouraites;