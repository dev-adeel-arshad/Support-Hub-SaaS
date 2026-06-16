import { useState } from "react";
import { Link } from "react-router-dom";

import { useDashboardStats } from "../../hooks/userHooks/userDashboardStats";
import { useAllTickets } from "../../hooks/ticketHooks/useAllTickets";

import TicketTable from "../../components/ticketsComponents/TicketTable";

export default function Dashboard() {

    const [statusFilter, setStatusFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [search, setSearch] = useState("");

    const {
        data: statsData,
        isLoading: statsLoading,
        isError: statsError,
    } = useDashboardStats();

    const filters = {
        ...(statusFilter !== "all" ? { status: statusFilter } : {}),
        ...(priorityFilter !== "all" ? { priority: priorityFilter } : {}),
        ...(search.trim() ? { search: search.trim() } : {}),
    };

    const {
        data: ticketsData,
        isLoading: ticketsLoading,
        isError: ticketsError,
    } = useAllTickets(filters);

    if (statsLoading || ticketsLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600">Loading dashboard...</div>;
    }

    if (statsError || ticketsError) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-red-500">Failed to load dashboard data.</div>;
    }

    const stats = statsData?.data || {};

    const tickets = ticketsData?.data || [];

    // return (
    //     <div className="min-h-screen bg-slate-50 p-6">

    //         {/* HEADER */}

    //         <div className="mb-8">

    //             <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    //                 <div>
    //                     <h1 className="text-4xl font-bold text-slate-950">Admin Dashboard</h1>
    //                     <p className="text-slate-600 mt-2 max-w-3xl">
    //                         Monitor ticket activity, review assignments, and filter the full ticket list by status, priority, or search term.
    //                     </p>
    //                 </div>
    //                 <div className="flex flex-wrap gap-3">
    //                     <Link
    //                         to="/admin/assignable"
    //                         className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
    //                     >
    //                         Assignable people
    //                     </Link>
    //                     <Link
    //                         to="/admin/users"
    //                         className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
    //                     >
    //                         User directory
    //                     </Link>
    //                 </div>
    //             </div>

    //         </div>

    //         {/* STATS */}

    //         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 mb-10">

    //                 <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

    //                     <p className="text-slate-500">
    //                     Total Tickets
    //                 </p>

    //                     <h2 className="text-3xl font-bold text-slate-950 mt-2">
    //                     {stats.totalTickets || 0}
    //                 </h2>

    //             </div>

    //                 <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

    //                     <p className="text-slate-500">
    //                     Open
    //                 </p>

    //                     <h2 className="text-3xl font-bold text-green-600 mt-2">
    //                     {stats.openTickets || 0}
    //                 </h2>

    //             </div>

    //                 <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

    //                     <p className="text-slate-500">
    //                     In Progress
    //                 </p>

    //                     <h2 className="text-3xl font-bold text-amber-600 mt-2">
    //                     {stats.inProgressTickets || 0}
    //                 </h2>

    //             </div>

    //                 <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

    //                     <p className="text-slate-500">
    //                     Resolved
    //                 </p>

    //                     <h2 className="text-3xl font-bold text-blue-600 mt-2">
    //                     {stats.resolvedTickets || 0}
    //                 </h2>

    //             </div>

    //                 <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

    //                     <p className="text-slate-500">
    //                     Closed
    //                 </p>

    //                     <h2 className="text-3xl font-bold text-red-600 mt-2">
    //                     {stats.closedTickets || 0}
    //                 </h2>

    //             </div>

    //         </div>

    //         {/* FILTER */}

    //         <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

    //             <div className="grid gap-4 md:grid-cols-3 flex-1">

    //                 <div>
    //                     <label className="mb-2 block text-sm font-medium text-slate-600">Search</label>
    //                     <input
    //                         value={search}
    //                         onChange={(e) => setSearch(e.target.value)}
    //                         placeholder="Search tickets"
    //                         className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-blue-500"
    //                     />
    //                 </div>

    //                 <div>
    //                     <label className="mb-2 block text-sm font-medium text-slate-600">Status</label>
    //                     <select
    //                         value={statusFilter}
    //                         onChange={(e) => setStatusFilter(e.target.value)}
    //                         className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-blue-500"
    //                     >
    //                         <option value="all">All Tickets</option>
    //                         <option value="open">Open</option>
    //                         <option value="in-progress">In Progress</option>
    //                         <option value="resolved">Resolved</option>
    //                         <option value="closed">Closed</option>
    //                     </select>
    //                 </div>

    //                 <div>
    //                     <label className="mb-2 block text-sm font-medium text-slate-600">Priority</label>
    //                     <select
    //                         value={priorityFilter}
    //                         onChange={(e) => setPriorityFilter(e.target.value)}
    //                         className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-blue-500"
    //                     >
    //                         <option value="all">All Priorities</option>
    //                         <option value="low">Low</option>
    //                         <option value="medium">Medium</option>
    //                         <option value="high">High</option>
    //                     </select>
    //                 </div>

    //             </div>

    //         </div>

    //         {/* TABLE */}

    //         <TicketTable
    //             tickets={tickets}
    //             getTicketLink={(ticket) => `/tickets/${ticket._id}`}
    //         />

    //     </div>
    // );


    return (
    <div className="min-h-screen bg-slate-950 text-white px-4 md:px-6 py-8">

        {/* HERO SECTION */}

        <section
            className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-slate-800
                bg-gradient-to-br
                from-slate-900
                via-slate-900
                to-blue-950/40
                p-8
                md:p-10
                mb-8
            "
        >

            <div className="absolute inset-0 opacity-20">
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-600 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">

                <div>

                    <p className="uppercase tracking-widest text-blue-400 text-sm font-semibold">
                        Admin Panel
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold mt-3">
                        Dashboard Overview
                    </h1>

                    <p className="mt-4 text-slate-400 max-w-3xl leading-relaxed">
                        Monitor ticket activity, manage assignments,
                        review user requests and keep your support
                        workflow organized from a single dashboard.
                    </p>

                </div>

                <div className="flex flex-wrap gap-3">

                    <Link
                        to="/admin/users"
                        className="
                            px-5
                            py-3
                            rounded-xl
                            bg-blue-600
                            hover:bg-blue-700
                            transition-all
                            duration-300
                            hover:scale-105
                            font-medium
                        "
                    >
                        User Management
                    </Link>

                    <Link
                        to="/admin/users"
                        className="
                            px-5
                            py-3
                            rounded-xl
                            border
                            border-slate-700
                            bg-slate-900
                            hover:border-blue-500
                            hover:bg-slate-800
                            transition-all
                            duration-300
                        "
                    >
                        User Directory
                    </Link>

                </div>

            </div>

        </section>

        {/* STATS */}

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5 mb-8">

            <div className="group bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1">
                <p className="text-slate-400">Total Tickets</p>
                <h2 className="text-4xl font-bold mt-3">
                    {stats.totalTickets || 0}
                </h2>
            </div>

            <div className="group bg-slate-900 border border-green-900 rounded-3xl p-6 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-1">
                <p className="text-slate-400">Open</p>
                <h2 className="text-4xl font-bold text-green-500 mt-3">
                    {stats.openTickets || 0}
                </h2>
            </div>

            <div className="group bg-slate-900 border border-amber-900 rounded-3xl p-6 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1">
                <p className="text-slate-400">In Progress</p>
                <h2 className="text-4xl font-bold text-amber-500 mt-3">
                    {stats.inProgressTickets || 0}
                </h2>
            </div>

            <div className="group bg-slate-900 border border-blue-900 rounded-3xl p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
                <p className="text-slate-400">Resolved</p>
                <h2 className="text-4xl font-bold text-blue-500 mt-3">
                    {stats.resolvedTickets || 0}
                </h2>
            </div>

            <div className="group bg-slate-900 border border-red-900 rounded-3xl p-6 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300 hover:-translate-y-1">
                <p className="text-slate-400">Closed</p>
                <h2 className="text-4xl font-bold text-red-500 mt-3">
                    {stats.closedTickets || 0}
                </h2>
            </div>

        </section>

        {/* FILTERS */}

        <section
            className="
                bg-slate-900
                border
                border-slate-800
                rounded-3xl
                p-6
                mb-8
            "
        >

            <div className="mb-5">
                <h2 className="text-xl font-semibold">
                    Filter Tickets
                </h2>

                <p className="text-slate-400 text-sm mt-1">
                    Search tickets and narrow results by status or priority.
                </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">

                <div>

                    <label className="block mb-2 text-sm text-slate-400">
                        Search
                    </label>

                    <input
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search by title..."
                        className="
                            w-full
                            bg-slate-950
                            border
                            border-slate-700
                            rounded-xl
                            px-4
                            py-3
                            text-white
                            outline-none
                            transition
                            focus:border-blue-500
                        "
                    />

                </div>

                <div>

                    <label className="block mb-2 text-sm text-slate-400">
                        Status
                    </label>

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }
                        className="
                            w-full
                            bg-slate-950
                            border
                            border-slate-700
                            rounded-xl
                            px-4
                            py-3
                            text-white
                            outline-none
                            focus:border-blue-500
                        "
                    >
                        <option value="all">All Tickets</option>
                        <option value="open">Open</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                    </select>

                </div>

                <div>

                    <label className="block mb-2 text-sm text-slate-400">
                        Priority
                    </label>

                    <select
                        value={priorityFilter}
                        onChange={(e) =>
                            setPriorityFilter(e.target.value)
                        }
                        className="
                            w-full
                            bg-slate-950
                            border
                            border-slate-700
                            rounded-xl
                            px-4
                            py-3
                            text-white
                            outline-none
                            focus:border-blue-500
                        "
                    >
                        <option value="all">All Priorities</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>

                </div>

            </div>

        </section>

        {/* TABLE SECTION */}

        <section
            className="
                bg-slate-900
                border
                border-slate-800
                rounded-3xl
                p-4
                md:p-6
            "
        >

            <div className="mb-5">

                <h2 className="text-xl font-semibold">
                    Ticket Management
                </h2>

                <p className="text-slate-400 text-sm mt-1">
                    Review and manage all tickets from one place.
                </p>

            </div>

            <TicketTable
                tickets={tickets}
                getTicketLink={(ticket) =>
                    `/tickets/${ticket._id}`
                }
            />

        </section>

    </div>
);
}