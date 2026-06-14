import { Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";

import Home from "../pages/homePage/HomePage";
import Dashboard from "../pages/DashboardPage";
import CreateTicket from "../pages/createTicketPage/CreateTicket";
import MyTickets from "../pages/myTicketsPage/MyTickets";
import TicketDetails from "../pages/TicketDetails/TicketDetails";
import Login from "../pages/loginPage/LoginPage";
import RegisterUser from "../pages/registerUser/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
    return (
        <Routes>

            <Route element={<MainLayout />}>
                <Route
                    path="/"
                    element={<Home />}
                />

                <Route element={<ProtectedRoute />}>
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/tickets"
                        element={<MyTickets />}
                    />

                    <Route
                        path="/create-ticket"
                        element={<CreateTicket />}
                    />

                    <Route
                        path="/tickets/:id"
                        element={<TicketDetails />}
                    />

                </Route>
            </Route>

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


        </Routes>
    );
}