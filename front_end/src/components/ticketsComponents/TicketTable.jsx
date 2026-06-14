import TicketStatusBadge from "./TicketStatusBadge";
import TicketPriorityBadge from "./TicketPriorityBadge";

export default function TicketTable({
    tickets,
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
                            className="border-b"
                        >

                            <td className="p-4">
                                {ticket.title}
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