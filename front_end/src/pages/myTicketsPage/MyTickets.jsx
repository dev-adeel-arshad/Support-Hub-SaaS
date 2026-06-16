import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

import { useTickets } from "../../hooks/ticketHooks/useTickets";
import TicketTable from "../../components/ticketsComponents/TicketTable";

export default function MyTickets() {
    const [statusFilter, setStatusFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");

    const { data, isLoading } = useTickets();
    const tickets = data?.data || [];

    const summary = useMemo(() => {
        return tickets.reduce(
            (acc, ticket) => {
                acc.total += 1;
                acc[ticket.status] = (acc[ticket.status] || 0) + 1;
                acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
                return acc;
            },
            {
                total: 0,
                open: 0,
                "in-progress": 0,
                resolved: 0,
                closed: 0,
                low: 0,
                medium: 0,
                high: 0,
            }
        );
    }, [tickets]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-400">
                Loading tickets...
            </div>
        );
    }

    const filteredTickets = tickets.filter((ticket) => {
        const statusMatch = statusFilter === "all" || ticket.status === statusFilter;
        const priorityMatch = priorityFilter === "all" || ticket.priority === priorityFilter;
        return statusMatch && priorityMatch;
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 px-4 sm:px-6 lg:px-8 py-8 text-white">
            <div className="mx-auto max-w-7xl space-y-8">
                {/* HEADER */}
                <section className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 p-6 md:p-8 shadow-xl">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-blue-400 uppercase tracking-widest text-sm">Your Tickets</p>
                            <h1 className="text-3xl md:text-4xl font-bold mt-2">My Tickets</h1>
                            <p className="mt-3 text-slate-400">Track and manage all your support requests.</p>
                        </div>
                        <Link
                            to="/create-ticket"
                            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 font-medium text-center"
                        >
                            + Create Ticket
                        </Link>
                    </div>
                </section>

                {/* STATS */}
                <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 hover:border-blue-500 transition-all">
                        <p className="text-slate-400 text-sm">Total</p>
                        <p className="mt-3 text-3xl font-bold">{summary.total}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 hover:border-green-500 transition-all">
                        <p className="text-slate-400 text-sm">Open</p>
                        <p className="mt-3 text-3xl font-bold text-green-400">{summary.open}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 hover:border-amber-500 transition-all">
                        <p className="text-slate-400 text-sm">In Progress</p>
                        <p className="mt-3 text-3xl font-bold text-amber-400">{summary["in-progress"]}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 hover:border-purple-500 transition-all">
                        <p className="text-slate-400 text-sm">Resolved</p>
                        <p className="mt-3 text-3xl font-bold text-purple-400">{summary.resolved}</p>
                    </div>
                </section>

                {/* FILTERS */}
                <section className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full rounded-xl border border-slate-700 bg-slate-800 text-white px-4 py-3 focus:border-blue-500 focus:outline-none"
                        >
                            <option value="all">All Statuses</option>
                            <option value="open">Open</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Priority</label>
                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="w-full rounded-xl border border-slate-700 bg-slate-800 text-white px-4 py-3 focus:border-blue-500 focus:outline-none"
                        >
                            <option value="all">All Priorities</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                </section>

                {/* TICKETS */}
                {filteredTickets.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center">
                        <h2 className="text-xl font-semibold">No tickets found</h2>
                        <p className="mt-2 text-slate-400">Create your first ticket to start tracking support requests.</p>
                    </div>
                ) : (
                    <TicketTable
                        tickets={filteredTickets}
                        getTicketLink={(ticket) => `/tickets/${ticket._id}`}
                    />
                )}
            </div>
        </div>
    );
}
