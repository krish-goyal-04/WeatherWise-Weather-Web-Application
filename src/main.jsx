import React  from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import ReactDOM from "react-dom/client"
import './index.css'
import { ThemeProvider } from "./context/ThemeProvider.jsx"
import WeatherDashboard from './pages/WeatherDashboard.jsx'
import Footer from './components/Footer.jsx'
import CityPage from "./pages/CityPage.jsx"
import Header from './components/Header.jsx'
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner'


const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:5*60*1000, //5 minutes
      gcTime:10*60*1000,
      retry:false,
      refetchOnWindowFocus:true
    }
  }
})

// eslint-disable-next-line react-refresh/only-export-components
const AppLayout = ()=>{
  return(
    <div className="bg-gradient-to-br from-background to-muted">
            <Header />
            <main className="container mx-auto min-h-screen px-4 py-8 "><Outlet/></main>
            <Footer />
    </div>
  )
}

const appRouter = createBrowserRouter([
  {
    path:"/",
    element: <AppLayout />,
    children:[
      {
        path:"/",
        element:<WeatherDashboard />
      },
      {
        path:"/city/:cityName",
        element:<CityPage />
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <RouterProvider router={appRouter} />
      <Toaster richColors />
    </ThemeProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  
  
)
