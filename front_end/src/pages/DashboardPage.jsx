import { useDashboardStats } from "../hooks/userHooks/userDashboardStats";

export default function Dashboard() {

    const {
        data,
        isLoading,
        isError,
        error,
    } = useDashboardStats();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading Dashboard...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                {error?.message || "Something went wrong"}
            </div>
        );
    }

    const stats = data?.data;

    return (
        <div className="min-h-screen bg-slate-100 p-6">

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-slate-800">
                    Dashboard
                </h1>

                <p className="text-slate-500 mt-2">
                    Overview of your support platform
                </p>

            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

                <div className="rounded-xl bg-white p-6 shadow">

                    <h3 className="text-slate-500 text-sm">
                        Total Tickets
                    </h3>

                    <p className="mt-2 text-3xl font-bold">
                        {stats?.totalTickets || 0}
                    </p>

                </div>

                <div className="rounded-xl bg-white p-6 shadow">

                    <h3 className="text-slate-500 text-sm">
                        Open Tickets
                    </h3>

                    <p className="mt-2 text-3xl font-bold">
                        {stats?.openTickets || 0}
                    </p>

                </div>

                <div className="rounded-xl bg-white p-6 shadow">

                    <h3 className="text-slate-500 text-sm">
                        Resolved Tickets
                    </h3>

                    <p className="mt-2 text-3xl font-bold">
                        {stats?.resolvedTickets || 0}
                    </p>

                </div>

                <div className="rounded-xl bg-white p-6 shadow">

                    <h3 className="text-slate-500 text-sm">
                        Total Users
                    </h3>

                    <p className="mt-2 text-3xl font-bold">
                        {stats?.totalUsers || 0}
                    </p>

                </div>

            </div>

        </div>
    );
}