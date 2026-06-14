import { Link } from "react-router-dom";

import { useTickets } from "../../hooks/ticketHooks/useTickets";

export default function MyTickets() {

    const {
        data,
        isLoading,
    } = useTickets();

    if (isLoading) {

        return (
            <h1>
                Loading...
            </h1>
        );

    }

    const tickets = data?.data || [];

    return (

        <div className="p-6">

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    My Tickets
                </h1>

                <Link
                    to="/create-ticket"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Create Ticket
                </Link>

            </div>

            <div className="grid gap-4">

                {tickets.map((ticket) => (

                    <Link
                        key={ticket._id}
                        to={`/tickets/${ticket._id}`}
                    >

                        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg">

                            <h2 className="font-semibold text-lg">
                                {ticket.title}
                            </h2>

                            <p className="text-slate-500 mt-2">
                                {ticket.description.slice(
                                    0,
                                    100
                                )}
                            </p>

                            <div className="flex gap-4 mt-4">

                                <span>
                                    {ticket.status}
                                </span>

                                <span>
                                    {ticket.priority}
                                </span>

                            </div>

                        </div>

                    </Link>

                ))}

            </div>

        </div>

    );
}