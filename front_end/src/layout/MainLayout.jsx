import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";
export default function MainLayout(){
    return(
        <>
        <Navbar />
        <main>
            <Outlet/>
        </main>
        <Footer />
        </>
    )
}