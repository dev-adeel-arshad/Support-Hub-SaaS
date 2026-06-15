import { useState } from "react";

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

    return (
        <div className="min-h-screen bg-slate-50 p-6">

            {/* HEADER */}

            <div className="mb-8">

                <h1 className="text-4xl font-bold text-slate-950">
                    Admin Dashboard
                </h1>

                <p className="text-slate-600 mt-2 max-w-3xl">
                    Monitor ticket activity, review assignments, and filter the full ticket list by status, priority, or search term.
                </p>

            </div>

            {/* STATS */}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 mb-10">

                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

                        <p className="text-slate-500">
                        Total Tickets
                    </p>

                        <h2 className="text-3xl font-bold text-slate-950 mt-2">
                        {stats.totalTickets || 0}
                    </h2>

                </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

                        <p className="text-slate-500">
                        Open
                    </p>

                        <h2 className="text-3xl font-bold text-green-600 mt-2">
                        {stats.openTickets || 0}
                    </h2>

                </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

                        <p className="text-slate-500">
                        In Progress
                    </p>

                        <h2 className="text-3xl font-bold text-amber-600 mt-2">
                        {stats.inProgressTickets || 0}
                    </h2>

                </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

                        <p className="text-slate-500">
                        Resolved
                    </p>

                        <h2 className="text-3xl font-bold text-blue-600 mt-2">
                        {stats.resolvedTickets || 0}
                    </h2>

                </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

                        <p className="text-slate-500">
                        Closed
                    </p>

                        <h2 className="text-3xl font-bold text-red-600 mt-2">
                        {stats.closedTickets || 0}
                    </h2>

                </div>

            </div>

            {/* FILTER */}

            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

                <div className="grid gap-4 md:grid-cols-3 flex-1">

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-600">Search</label>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search tickets"
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-600">Status</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-blue-500"
                        >
                            <option value="all">All Tickets</option>
                            <option value="open">Open</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-600">Priority</label>
                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-blue-500"
                        >
                            <option value="all">All Priorities</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                </div>

            </div>

            {/* TABLE */}

            <TicketTable
                tickets={tickets}
                getTicketLink={(ticket) => `/tickets/${ticket._id}`}
            />

        </div>
    );
}