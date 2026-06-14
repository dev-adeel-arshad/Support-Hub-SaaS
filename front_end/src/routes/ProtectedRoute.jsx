import { Navigate, Outlet } from "react-router-dom";

import { useCurrentUser } from "../hooks/userHooks/useCurrentUser";

export default function ProtectedRoute() {



    const {
        data,
        isLoading,
        isError,
    } = useCurrentUser();

    if (isLoading) {

        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );

    }

    if (isError || !data?.data?.user) {

       return <Navigate to="/login" replace />

    }

    return <Outlet />;
}