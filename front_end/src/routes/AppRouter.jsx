import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../layout/Layout";
import Home from "../pages/homePage/HomePage";
import Login from "../pages/loginPage/LoginPage";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}