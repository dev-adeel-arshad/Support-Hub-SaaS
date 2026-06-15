import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

import { useTickets } from "../../hooks/ticketHooks/useTickets";
import TicketTable from "../../components/ticketsComponents/TicketTable";

export default function MyTickets() {

    const [statusFilter, setStatusFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");

    const {
        data,
        isLoading,
    } = useTickets();

    if (isLoading) {

        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600">
                Loading tickets...
            </div>
        );

    }

    const tickets = data?.data || [];

    const filteredTickets = tickets.filter((ticket) => {
        const statusMatch = statusFilter === "all" || ticket.status === statusFilter;
        const priorityMatch = priorityFilter === "all" || ticket.priority === priorityFilter;
        return statusMatch && priorityMatch;
    });

    const summary = useMemo(() => {
        return tickets.reduce(
            (accumulator, ticket) => {
                accumulator.total += 1;
                accumulator[ticket.status] = (accumulator[ticket.status] || 0) + 1;
                accumulator[ticket.priority] = (accumulator[ticket.priority] || 0) + 1;
                return accumulator;
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

    return (

        <div className="min-h-screen bg-slate-50 px-6 py-10">

            <div className="mx-auto max-w-7xl mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h1 className="text-3xl font-bold text-slate-950">
                    My Tickets
                    </h1>
                    <p className="mt-1 text-slate-600">Only tickets created by the signed-in user.</p>
                </div>

                <Link
                    to="/create-ticket"
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
                >
                    Create Ticket
                </Link>

            </div>

            <div className="mx-auto max-w-7xl grid gap-4 md:grid-cols-4 mb-6">
                <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
                    <p className="text-sm text-slate-500">Total</p>
                    <p className="mt-2 text-2xl font-bold text-slate-950">{summary.total}</p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
                    <p className="text-sm text-slate-500">Open</p>
                    <p className="mt-2 text-2xl font-bold text-green-600">{summary.open}</p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
                    <p className="text-sm text-slate-500">Resolved</p>
                    <p className="mt-2 text-2xl font-bold text-blue-600">{summary.resolved}</p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
                    <p className="text-sm text-slate-500">In Progress</p>
                    <p className="mt-2 text-2xl font-bold text-amber-600">{summary["in-progress"]}</p>
                </div>
            </div>

            <div className="mx-auto max-w-7xl grid gap-4 md:grid-cols-3 mb-6">
                <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
                    <p className="text-sm text-slate-500">Closed</p>
                    <p className="mt-2 text-2xl font-bold text-red-600">{summary.closed}</p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
                    <p className="text-sm text-slate-500">Low Priority</p>
                    <p className="mt-2 text-2xl font-bold text-green-600">{summary.low}</p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
                    <p className="text-sm text-slate-500">Medium / High</p>
                    <p className="mt-2 text-2xl font-bold text-slate-950">{summary.medium + summary.high}</p>
                </div>
            </div>

            <div className="mx-auto max-w-7xl mb-6 grid gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-600">Status</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-blue-500"
                    >
                        <option value="all">All Statuses</option>
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

            <div className="mx-auto max-w-7xl">

                {filteredTickets.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
                        <h2 className="text-xl font-semibold text-slate-950">No tickets yet</h2>
                        <p className="mt-2 text-slate-600">Create your first ticket to start tracking support requests.</p>
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