import { useQueryClient,useQuery, useMutation } from "@tanstack/react-query"
import useLocalStorage from "./useLocalStorage"
import { useEffect } from "react";



const useSearchHistory = ()=>{
    const [history,setHisory] = useLocalStorage("search-history",[])
    const queryClient = useQueryClient();

    //Accessing data
    const historyQuery = useQuery({
        queryKey:["search-history"],
        queryFn: ()=>history,
        initialData:history
    })

    useEffect(()=>{
        queryClient.setQueryData(["search-history"],history)
    },[history,queryClient])

    const addToHistroy = useMutation({
        mutationFn:async (search)=>{
            const newSearch = {
                ...search,
                id:`${search.lat}-${search.lon}-${Date.now()}`,
                searchedAt:Date.now()
            }

            const filteredHistory = history.filter((item)=>
                !(item.lat===search.lat && item.lon===search.lon)
            )

            const newHistory = [newSearch,...filteredHistory].slice(0,10)

            setHisory(newHistory)
            return newHistory
        },
        onSuccess:(newHistory)=>{
            queryClient.setQueryData(["search-history"],newHistory)
        }
    })

    const clearHistory = useMutation({
        mutationFn:async ()=>{
            setHisory([])
            return []
        },
        onSuccess:()=>{
            queryClient.setQueryData(["search-history"],[])
        }
    })

    return{
        history:historyQuery.data??[],
        addToHistroy,
        clearHistory
    }
}
export default useSearchHistory