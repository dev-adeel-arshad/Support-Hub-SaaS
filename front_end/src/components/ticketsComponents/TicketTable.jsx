import { Link } from "react-router-dom";
import TicketStatusBadge from "./TicketStatusBadge";
import TicketPriorityBadge from "./TicketPriorityBadge";

export default function TicketTable({ tickets, getTicketLink }) {
    return (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-slate-200">

                <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/70">
                        <th className="p-4 text-left text-slate-300 font-medium">Title</th>
                        <th className="p-4 text-left text-slate-300 font-medium">Status</th>
                        <th className="p-4 text-left text-slate-300 font-medium">Priority</th>
                    </tr>
                </thead>

                <tbody>
                    {tickets.map((ticket) => (
                        <tr
                            key={ticket._id}
                            className="border-b border-slate-800 hover:bg-slate-800/40 transition cursor-pointer"
                            onClick={() =>
                                getTicketLink &&
                                window.location.assign(getTicketLink(ticket))
                            }
                        >
                            <td className="p-4">
                                {getTicketLink ? (
                                    <Link
                                        to={getTicketLink(ticket)}
                                        className="font-medium text-white hover:text-blue-400 transition"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {ticket.title}
                                    </Link>
                                ) : (
                                    <span className="text-white font-medium">
                                        {ticket.title}
                                    </span>
                                )}
                            </td>

                            <td className="p-4">
                                <TicketStatusBadge status={ticket.status} />
                            </td>

                            <td className="p-4">
                                <TicketPriorityBadge priority={ticket.priority} />
                            </td>
                        </tr>
                    ))}
                </tbody>

                </table>
            </div>

        </div>
    );
}