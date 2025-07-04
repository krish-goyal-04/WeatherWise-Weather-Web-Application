import { useQueryClient,useQuery, useMutation } from "@tanstack/react-query"
import useLocalStorage from "./useLocalStorage"



const useSearchHistory = ()=>{
    const [history,setHisory] = useLocalStorage("search-history",[])
    const queryClient = useQueryClient();

    //Accessing data
    const historyQuery = useQuery({
        queryKey:["search-history"],
        queryFn: ()=>history,
        initialData:history
    })

    const addToHistroy = useMutation({
        mutationFn:async (search)=>{
            const newSearch = {
                ...search,
                id:`${search.lat}-${search.lon}-${Date.now()}`,
                searchedAt:Date.now()
            }

            const filteredHistory = history.filter((item)=>{
                !(item.lat===search.lat && item.lon===search.lon)
            })

            const newHistory = [newSearch,...filteredHistory].slice(0,10)

            setHisory(newHistory)
            return newHistory
        },
        onSuccess:(newHistory)=>{
            queryClient.setQueryData(["search-history"],newHistory)
        }
    })
}
export default useSearchHistory