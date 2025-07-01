import Footer from "./Footer";

const Layout = ({children})=>{
    return(
        <div className="bg-gradient-to-br from-background to-muted">
            header
            <main className="container mx-auto min-h-screen px-4 py-8 ">{children}</main>
            <Footer></Footer>
        </div>
    )
}
export default Layout;