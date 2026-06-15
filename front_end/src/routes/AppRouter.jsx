import { Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";
import AdminRoute from "./AdminRoute";

import Home from "../pages/homePage/HomePage";
import Dashboard from "../pages/dashboardPage/DashboardPage";
import CreateTicket from "../pages/createTicketPage/CreateTicket";
import MyTickets from "../pages/myTicketsPage/MyTickets";
import TicketDetails from "../pages/TicketDetails/TicketDetails";
import Login from "../pages/loginPage/LoginPage";
import RegisterUser from "../pages/registerUser/RegisterPage";
import ServicesPage from "../pages/servicesPage/ServicesPage";
import ContactPage from "../pages/contactPage/ContactPage";
import ProfilePage from "../pages/profilePage/ProfilePage";
import AdminUsersPage from "../pages/adminUsersPage/AdminUsersPage";
import AssignablePeoplePage from "../pages/adminUsersPage/AssignablePeoplePage";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
    return (
        <Routes>

            <Route element={<MainLayout />}>
                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/services"
                    element={<ServicesPage />}
                />

                <Route
                    path="/contact-us"
                    element={<ContactPage />}
                />

                <Route element={<ProtectedRoute />}>
                    <Route
                        path="/tickets"
                        element={<MyTickets />}
                    />

                    <Route
                        path="/my-tickets"
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

                    <Route
                        path="/profile"
                        element={<ProfilePage />}
                    />
                </Route>

                <Route element={<AdminRoute />}>
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/all-tickets"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/admin/users"
                        element={<AdminUsersPage />}
                    />

                    <Route
                        path="/admin/assignable"
                        element={<AssignablePeoplePage />}
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