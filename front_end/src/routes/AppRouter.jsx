import { Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";

import Home from "../pages/homePage/HomePage";
import Login from "../pages/loginPage/LoginPage";
import RegisterUser from "../pages/registerUser/RegisterPage";

export default function AppRouter() {
    return (
        <Routes>

            <Route element={<AuthLayout />}>
                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register-user"
                    element={<RegisterUser />}
                />
            </Route>
            <Route element={<MainLayout />}>
                <Route
                    path="/"
                    element={<Home />}
                />
            </Route>


        </Routes>
    );
}