import { Link } from "react-router-dom";

import TicketStatusBadge from "./TicketStatusBadge";
import TicketPriorityBadge from "./TicketPriorityBadge";

export default function TicketTable({
    tickets,
    getTicketLink,
}) {

    return (

        <div className="overflow-hidden rounded-xl bg-white shadow">

            <table className="w-full">

                <thead>

                    <tr className="bg-slate-100 border-b">

                        <th className="p-4 text-left">
                            Title
                        </th>

                        <th className="p-4 text-left">
                            Status
                        </th>

                        <th className="p-4 text-left">
                            Priority
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {tickets.map((ticket) => (

                        <tr
                            key={ticket._id}
                            className="border-b hover:bg-slate-50 transition cursor-pointer"
                            onClick={() => getTicketLink && window.location.assign(getTicketLink(ticket))}
                        >

                            <td className="p-4">
                                {getTicketLink ? (
                                    <Link
                                        to={getTicketLink(ticket)}
                                        className="font-medium text-slate-900 hover:text-blue-600 transition"
                                        onClick={(event) => event.stopPropagation()}
                                    >
                                        {ticket.title}
                                    </Link>
                                ) : (
                                    <span className="font-medium text-slate-900">
                                        {ticket.title}
                                    </span>
                                )}
                            </td>

                            <td className="p-4">
                                <TicketStatusBadge
                                    status={ticket.status}
                                />
                            </td>

                            <td className="p-4">
                                <TicketPriorityBadge
                                    priority={ticket.priority}
                                />
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );
}