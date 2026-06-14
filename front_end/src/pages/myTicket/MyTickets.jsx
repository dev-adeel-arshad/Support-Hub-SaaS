import { useTickets } from "../../hooks/ticketHooks/useTickets";

import TicketTable from "../../components/ticketsComponents/TicketTable";

export default function MyTickets() {

    const {
        data,
        isLoading,
    } = useTickets();

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    const tickets = data?.data || [];

    return (

        <div className="p-6">

            <h1 className="mb-6 text-3xl font-bold">
                My Tickets
            </h1>

            <TicketTable
                tickets={tickets}
            />

        </div>

    );
}