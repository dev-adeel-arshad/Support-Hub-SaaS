import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useTicketDetails } from "../../hooks/ticketHooks/useTicketDetails";
import { useCurrentUser } from "../../hooks/userHooks/useCurrentUser";
import { useAssignablePeople } from "../../hooks/userHooks/useAssignablePeople";

import { useChangeStatus } from "../../hooks/ticketHooks/useChangeStatus";
import { useAssignTicket } from "../../hooks/ticketHooks/useAssignTicket";

import { useComments } from "../../hooks/comment/useComment";
import { useAddComment } from "../../hooks/comment/useAddComment";

import TicketStatusBadge from "../../components/ticketsComponents/TicketStatusBadge";
import TicketPriorityBadge from "../../components/ticketsComponents/TicketPriorityBadge";

export default function TicketDetails() {

    const { id } = useParams();
    const queryClient = useQueryClient();

    const { data, isLoading } = useTicketDetails(id);
    const { data: userData } = useCurrentUser();

    const ticket = data?.data;
    const user = userData?.data;
    const { data: peopleData } = useAssignablePeople({
        enabled: user?.role === "admin",
    });

    const assignablePeople = peopleData?.data || [];

    const { data: commentData } = useComments(id);
    const addComment = useAddComment(id);

    const comments = commentData?.data || [];

    const changeStatus = useChangeStatus();
    const assignTicket = useAssignTicket();

    const [message, setMessage] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [assignedPersonEmail, setAssignedPersonEmail] = useState("");

    // ---------------------------
    // COMMENT HANDLER
    // ---------------------------
    const handleAddComment = async () => {

        if (!message.trim()) {
            toast.error("Comment cannot be empty");
            return;
        }

        try {
            await addComment.mutateAsync({
                ticketId: id,
                message,
            });

            setMessage("");

            toast.success("Comment added");

            queryClient.invalidateQueries({
                queryKey: ["comments", id],
            });

        } catch (error) {
            toast.error("Failed to add comment");
        }
    };

    // ---------------------------
    // STATUS UPDATE (ADMIN)
    // ---------------------------
    const handleStatusChange = async (status) => {

        if (!status) {
            toast.error("Select a status first");
            return;
        }

        try {
            await changeStatus.mutateAsync({ id, status });

            toast.success("Status updated");

            queryClient.invalidateQueries({
                queryKey: ["ticket-details", id],
            });

            queryClient.invalidateQueries({
                queryKey: ["all-tickets"],
            });

            queryClient.invalidateQueries({
                queryKey: ["tickets"],
            });

            queryClient.invalidateQueries({
                queryKey: ["dashboard-stats"],
            });

        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    // ---------------------------
    // ASSIGN (ADMIN)
    // ---------------------------
    const handleAssign = async (assignedToEmail) => {

        if (!assignedToEmail) {
            toast.error("Select a person first");
            return;
        }

        try {
            await assignTicket.mutateAsync({ id, assignedToEmail });

            toast.success("Ticket assigned");

            queryClient.invalidateQueries({
                queryKey: ["ticket-details", id],
            });

            queryClient.invalidateQueries({
                queryKey: ["tickets"],
            });

            queryClient.invalidateQueries({
                queryKey: ["all-tickets"],
            });

            queryClient.invalidateQueries({
                queryKey: ["dashboard-stats"],
            });

            queryClient.invalidateQueries({
                queryKey: ["all-users"],
            });

        } catch (error) {
            toast.error("Failed to assign ticket");
        }
    };

    // ---------------------------
    // LOADING STATE
    // ---------------------------
    if (isLoading || !ticket) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600">
                Loading ticket details...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
            <div className="mx-auto max-w-5xl space-y-6">
                <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                            <p className="text-sm font-medium uppercase tracking-wide text-blue-600">Ticket details</p>
                            <h1 className="mt-2 text-3xl font-bold text-slate-950">{ticket.title}</h1>
                            <p className="mt-4 max-w-3xl text-slate-600">{ticket.description}</p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <TicketStatusBadge status={ticket.status} />
                            <TicketPriorityBadge priority={ticket.priority} />
                        </div>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-3 text-sm text-slate-600">
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="font-medium text-slate-500">Ticket ID</p>
                            <p className="mt-1 text-slate-900">{ticket.ticketId}</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="font-medium text-slate-500">Created by</p>
                            <p className="mt-1 text-slate-900">{ticket.createdBy?.username || "Unknown user"}</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="font-medium text-slate-500">Assigned to</p>
                            <p className="mt-1 text-slate-900">{ticket.assignedTo?.username || "Unassigned"}</p>
                        </div>
                    </div>
                </section>

                {user?.role === "admin" && (
                    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <h2 className="text-xl font-semibold text-slate-950">Admin Actions</h2>

                        <div className="mt-5 grid gap-4 md:grid-cols-2">
                            <div className="space-y-3">
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                                >
                                    <option value="">Change status</option>
                                    <option value="open">Open</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="resolved">Resolved</option>
                                    <option value="closed">Closed</option>
                                </select>

                                <button
                                    type="button"
                                    onClick={() => handleStatusChange(selectedStatus)}
                                    className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                                >
                                    Update Status
                                </button>
                            </div>

                            <div className="space-y-3">
                                <select
                                    value={assignedPersonEmail}
                                    onChange={(e) => setAssignedPersonEmail(e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                                >
                                    <option value="">Assign to approved person</option>
                                    {assignablePeople.map((person) => (
                                        <option key={person._id} value={person.email}>
                                            {person.name} - {person.position} ({person.email})
                                        </option>
                                    ))}
                                </select>

                                <button
                                    type="button"
                                    onClick={() => handleAssign(assignedPersonEmail)}
                                    className="rounded-xl border border-slate-200 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
                                >
                                    Assign Ticket
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                        <h2 className="text-xl font-semibold text-slate-950">Comments</h2>
                        <span className="text-sm text-slate-500">{comments.length} total</span>
                    </div>

                    <div className="mt-5 space-y-4">
                        {comments.length === 0 ? (
                            <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-slate-500">No comments yet.</p>
                        ) : (
                            comments.map((c) => (
                                <div key={c._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="font-medium text-slate-950">{c.user?.username || "Unknown user"}</p>
                                        <span className="text-xs text-slate-500">{new Date(c.createdAt).toLocaleString()}</span>
                                    </div>
                                    <p className="mt-2 text-slate-700">{c.message}</p>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="mt-6 flex flex-col gap-3 md:flex-row">
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write a comment..."
                            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500"
                        />

                        <button
                            onClick={handleAddComment}
                            disabled={addComment.isPending}
                            className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {addComment.isPending ? "Sending..." : "Send comment"}
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}