import { Navigate, Outlet } from "react-router-dom";

import { useCurrentUser } from "../hooks/userHooks/useCurrentUser";

export default function AdminRoute() {
    const { data, isLoading, isError } = useCurrentUser();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600">
                Loading...
            </div>
        );
    }

    const user = data?.data;

    if (isError || user?.role !== "admin") {
        return <Navigate to="/tickets" replace />;
    }

    return <Outlet />;
}