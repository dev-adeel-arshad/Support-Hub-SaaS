import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";
export default function AuthLayout(){
    return(
        <>
    
            <Outlet/>
       
       
        </>
    )
}