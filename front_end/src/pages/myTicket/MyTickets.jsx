import { useState } from "react";
import { Link } from "react-router-dom";

import { useMyTickets } from "../../hooks/ticketHooks/useMyTickets";

import TicketTable from "../../components/ticketsComponents/TicketTable";

export default function MyTickets() {

    const [statusFilter, setStatusFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");

    const {
        data,
        isLoading,
    } = useMyTickets();

    if (isLoading) {

        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading Tickets...
            </div>
        );

    }

    const tickets = data?.data || [];

    const filteredTickets = tickets.filter((ticket) => {

        const statusMatch =
            statusFilter === "all"
                ? true
                : ticket.status === statusFilter;

        const priorityMatch =
            priorityFilter === "all"
                ? true
                : ticket.priority === priorityFilter;

        return statusMatch && priorityMatch;

    });

    return (

        <div className="min-h-screen bg-slate-950 p-6">

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-bold text-white">
                        My Tickets
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Manage and track your support requests.
                    </p>

                </div>

                <Link
                    to="/create-ticket"
                    className="
                        px-5
                        py-3
                        bg-blue-600
                        hover:bg-blue-700
                        rounded-xl
                        text-white
                        transition
                    "
                >
                    Create Ticket
                </Link>

            </div>

            {/* FILTERS */}

            <div className="flex gap-4 mb-6">

                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(e.target.value)
                    }
                    className="
                        bg-slate-900
                        border
                        border-slate-700
                        rounded-xl
                        px-4
                        py-3
                        text-white
                    "
                >
                    <option value="all">All Status</option>
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                </select>

                <select
                    value={priorityFilter}
                    onChange={(e) =>
                        setPriorityFilter(e.target.value)
                    }
                    className="
                        bg-slate-900
                        border
                        border-slate-700
                        rounded-xl
                        px-4
                        py-3
                        text-white
                    "
                >
                    <option value="all">All Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

            </div>

            <TicketTable tickets={filteredTickets} />

        </div>

    );

}