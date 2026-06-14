import { useParams } from "react-router-dom";

import { useTicket } from "../../hooks/ticketHooks/useMyTicket";

import { useComments } from "../../hooks/comment/useComment";

import CommentSection from "../../components/ticketsComponents/CommentSection";

export default function TicketDetails() {

    const { id } = useParams();

    const {
        data,
        isLoading,
    } = useTicket(id);

    const {
        data: commentsData,
    } = useComments(id);

    if (isLoading) {

        return (
            <div className="p-8">
                Loading...
            </div>
        );

    }

    const ticket =
        data?.data;

    const comments =
        commentsData?.data || [];

    return (

        <div className="max-w-5xl mx-auto p-6">

            <div className="bg-white rounded-xl shadow p-6">

                <h1 className="text-3xl font-bold">
                    {ticket.title}
                </h1>

                <p className="mt-4 text-slate-600">
                    {ticket.description}
                </p>

                <div className="flex gap-6 mt-6">

                    <span>
                        Status:
                        {" "}
                        {ticket.status}
                    </span>

                    <span>
                        Priority:
                        {" "}
                        {ticket.priority}
                    </span>

                </div>

            </div>

            <CommentSection
                ticketId={id}
                comments={comments}
            />

        </div>

    );
}