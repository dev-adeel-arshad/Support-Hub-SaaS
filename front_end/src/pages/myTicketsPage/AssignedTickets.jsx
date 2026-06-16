
import { Link } from "react-router-dom";
import { useAssignedTickets } from "../../hooks/ticketHooks/useAssignedTickets";
import TicketTable from "../../components/ticketsComponents/TicketTable";

export default function AssignedTickets() {

    const {
        data,
        isLoading,
        isError,
    } = useAssignedTickets();

    const tickets = data?.data || [];

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="mt-4 text-slate-400">
                        Loading assigned tickets...
                    </p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center">
                    <h2 className="text-xl font-semibold text-red-400">
                        Failed to load tickets
                    </h2>

                    <p className="text-slate-400 mt-2">
                        Something went wrong while fetching assigned tickets.
                    </p>
                </div>
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-slate-950 px-6 py-10">

            <div className="mx-auto max-w-7xl">

                {/* PAGE HEADER */}

                <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <span className="inline-flex items-center rounded-full bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400 border border-blue-500/20">
                            Assigned Work
                        </span>

                        <h1 className="mt-5 text-5xl font-bold text-white">
                            Assigned Tickets
                        </h1>

                        <p className="mt-4 max-w-2xl text-lg text-slate-400">
                            View and manage all tickets currently assigned
                            to your account. Track progress, update status,
                            and stay on top of support requests.
                        </p>

                    </div>

                    <Link
                        to="/profile"
                        className="
                            inline-flex
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-slate-700
                            bg-slate-900
                            px-6
                            py-3
                            text-slate-200
                            transition-all
                            duration-300
                            hover:bg-slate-800
                            hover:border-slate-600
                        "
                    >
                        Back to Profile
                    </Link>

                </div>

                {/* STATS */}

                <div className="grid gap-6 md:grid-cols-3 mb-10">

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

                        <p className="text-slate-400">
                            Total Assigned
                        </p>

                        <h2 className="mt-3 text-4xl font-bold text-white">
                            {tickets.length}
                        </h2>

                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

                        <p className="text-slate-400">
                            Active Work
                        </p>

                        <h2 className="mt-3 text-4xl font-bold text-amber-400">
                            {
                                tickets.filter(
                                    (ticket) =>
                                        ticket.status === "open" ||
                                        ticket.status === "in-progress"
                                ).length
                            }
                        </h2>

                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

                        <p className="text-slate-400">
                            Completed
                        </p>

                        <h2 className="mt-3 text-4xl font-bold text-green-400">
                            {
                                tickets.filter(
                                    (ticket) =>
                                        ticket.status === "resolved" ||
                                        ticket.status === "closed"
                                ).length
                            }
                        </h2>

                    </div>

                </div>

                {/* TICKETS */}

                {tickets.length === 0 ? (

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-16 text-center">

                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-800 text-4xl">
                            📋
                        </div>

                        <h2 className="text-2xl font-semibold text-white">
                            No Assigned Tickets
                        </h2>

                        <p className="mt-3 text-slate-400 max-w-xl mx-auto">
                            You currently don't have any assigned tickets.
                            Once an administrator assigns work to you,
                            those tickets will appear here.
                        </p>

                    </div>

                ) : (

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">

                        <div className="border-b border-slate-800 px-6 py-5">

                            <h2 className="text-xl font-semibold text-white">
                                Ticket List
                            </h2>

                            <p className="mt-1 text-slate-400">
                                {tickets.length} assigned ticket(s)
                            </p>

                        </div>

                        <TicketTable
                            tickets={tickets}
                            getTicketLink={(ticket) =>
                                `/tickets/${ticket._id}`
                            }
                        />

                    </div>

                )}

            </div>

        </div>

    );
}