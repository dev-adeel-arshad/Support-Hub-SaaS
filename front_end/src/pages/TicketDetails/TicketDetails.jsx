import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useTicketDetails } from "../../hooks/ticketHooks/useTicketDetails";
import { useCurrentUser } from "../../hooks/userHooks/useCurrentUser";
import { useAssignees } from "../../hooks/userHooks/useAssignablePeople";

import { useChangeStatus } from "../../hooks/ticketHooks/useChangeStatus";
import { useAssignTicket } from "../../hooks/ticketHooks/useAssignTicket";

import { useComments } from "../../hooks/comment/useComment";
import { useAddComment } from "../../hooks/comment/useAddComment";

import TicketStatusBadge from "../../components/ticketsComponents/TicketStatusBadge";
import TicketPriorityBadge from "../../components/ticketsComponents/TicketPriorityBadge";

export default function TicketDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const { data, isLoading } =
        useTicketDetails(id);

    const { data: userData } =
        useCurrentUser();

    const ticket =
        data?.data ??
        data?.data?.data ??
        data;

    const user = userData?.data;

    const {
        data: peopleData,
    } = useAssignees({
        enabled: user?.role === "admin",
    });

    const assignablePeople =
        peopleData?.data || [];

    const {
        data: commentData,
    } = useComments(id);

    const addComment =
        useAddComment(id);

    const comments =
        commentData?.data || [];

    const changeStatus =
        useChangeStatus();

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(user?.role === "admin" ? "/all-tickets" : "/tickets");
        }
    };

    const assignTicket =
        useAssignTicket();

    const [message, setMessage] =
        useState("");

    const [
        selectedStatus,
        setSelectedStatus,
    ] = useState("");

    const [
        selectedAssigneeId,
        setSelectedAssigneeId,
    ] = useState("");

    const isCurrentAssignee =
        ticket?.assignedTo?._id?.toString() ===
        user?._id?.toString();

    const canChangeStatus =
        user?.role === "admin" ||
        isCurrentAssignee;

    const canAssignTicket =
        user?.role === "admin";

    const actionHeading =
        user?.role === "admin"
            ? "Admin Actions"
            : "Ticket Actions";

    const handleAddComment =
        async () => {

            if (!message.trim()) {

                toast.error(
                    "Comment cannot be empty"
                );

                return;
            }

            try {

                await addComment.mutateAsync({
                    ticketId: id,
                    message,
                });

                setMessage("");

                toast.success(
                    "Comment added"
                );

                queryClient.invalidateQueries({
                    queryKey: [
                        "comments",
                        id,
                    ],
                });

            } catch {

                toast.error(
                    "Failed to add comment"
                );

            }
        };

    const handleStatusChange =
        async (status) => {

            if (!status) {

                toast.error(
                    "Select a status"
                );

                return;
            }

            try {

                toast.success(
                    "Status updated"
                );

                queryClient.invalidateQueries({
                    queryKey: [
                        "ticket-details",
                        id,
                    ],
                });

            } catch {

                toast.error(
                    "Failed to update status"
                );

            }
        };

    const handleAssign =
        async (assigneeId) => {

            if (!assigneeId) {

                toast.error(
                    "Select a user"
                );

                return;
            }

            try {

                await assignTicket.mutateAsync({
                    id,
                    userId: assigneeId,
                });

                toast.success(
                    "Ticket assigned"
                );

                queryClient.invalidateQueries({
                    queryKey: [
                        "ticket-details",
                        id,
                    ],
                });

            } catch {

                toast.error(
                    "Failed to assign"
                );

            }
        };

    if (isLoading || !ticket) {

        return (

            <div
                className="
                    min-h-screen
                    flex
                    items-center
                    justify-center
                    bg-slate-950
                    text-white
                "
            >
                Loading Ticket...
            </div>

        );
    }

    return (

        <div
            className="
                min-h-screen
                bg-slate-950
                px-4
                sm:px-6
                lg:px-8
                py-6
                md:py-10
                text-white
            "
        >

            <div
                className="
                    mx-auto
                    max-w-6xl
                    space-y-6
                "
            >

                {/* HEADER */}

                <section
                    className="
                        rounded-3xl
                        border
                        border-slate-800
                        bg-slate-900
                        p-5
                        sm:p-8
                        shadow-xl
                        transition-all
                        duration-300
                    "
                >

                    <div
                        className="
                            flex
                            flex-col
                            gap-6
                            lg:flex-row
                            lg:justify-between
                        "
                    >

                        <div>

                            <p
                                className="
                                    text-blue-400
                                    text-sm
                                    uppercase
                                    tracking-wider
                                "
                            >
                                Ticket Details
                            </p>

                            <h1
                                className="
                                    mt-2
                                    text-2xl
                                    md:text-4xl
                                    font-bold
                                    break-words
                                "
                            >
                                {ticket.title}
                            </h1>

                            <p
                                className="
                                    mt-4
                                    text-slate-400
                                    leading-relaxed
                                    break-words
                                "
                            >
                                {ticket.description}
                            </p>

                        </div>

                        <div
                            className="
                                flex
                                flex-col
                                gap-3
                                lg:items-end
                            "
                        >

                            <button
                                type="button"
                                onClick={handleBack}
                                className="
                                    px-4
                                    py-2
                                    rounded-xl
                                    bg-slate-800
                                    hover:bg-slate-700
                                    transition-all
                                "
                            >
                                ← Back
                            </button>

                            <div
                                className="
                                    flex
                                    flex-wrap
                                    gap-3
                                "
                            >
                                <TicketStatusBadge
                                    status={
                                        ticket.status
                                    }
                                />

                                <TicketPriorityBadge
                                    priority={
                                        ticket.priority
                                    }
                                />
                            </div>

                        </div>

                    </div>

                </section>

                {/* TICKET INFO */}

                <section
                    className="
                        grid
                        gap-4
                        sm:grid-cols-2
                        lg:grid-cols-4
                    "
                >

                    <div
                        className="
                            bg-slate-900
                            border
                            border-slate-800
                            rounded-2xl
                            p-5
                            hover:border-blue-500
                            transition-all
                        "
                    >

                        <p className="text-slate-500">
                            Ticket ID
                        </p>

                        <h3
                            className="
                                mt-2
                                font-semibold
                                break-all
                            "
                        >
                            {ticket.ticketId}
                        </h3>

                    </div>

                    <div
                        className="
                            bg-slate-900
                            border
                            border-slate-800
                            rounded-2xl
                            p-5
                            hover:border-blue-500
                            transition-all
                        "
                    >

                        <p className="text-slate-500">
                            Created By
                        </p>

                        <h3 className="mt-2 font-semibold">
                            {ticket.createdBy?.username ||
                                ticket.createdBy?.email ||
                                "Unknown"}
                        </h3>

                    </div>

                    <div
                        className="
                            bg-slate-900
                            border
                            border-slate-800
                            rounded-2xl
                            p-5
                            hover:border-blue-500
                            transition-all
                        "
                    >

                        <p className="text-slate-500">
                            Assigned To
                        </p>

                        <h3 className="mt-2 font-semibold">
                            {ticket.assignedTo?.username ||
                                ticket.assignedTo?.email ||
                                "Unassigned"}
                        </h3>

                    </div>

                    <div
                        className="
                            bg-slate-900
                            border
                            border-slate-800
                            rounded-2xl
                            p-5
                            hover:border-blue-500
                            transition-all
                        "
                    >

                        <p className="text-slate-500">
                            Created
                        </p>

                        <h3 className="mt-2 font-semibold">
                            {new Date(
                                ticket.createdAt
                            ).toLocaleDateString()}
                        </h3>

                    </div>

                </section>

                {/* ATTACHMENT */}

                {ticket.attachment && (

                    <section
                        className="
                            rounded-3xl
                            border
                            border-slate-800
                            bg-slate-900
                            p-6
                        "
                    >

                        <h2
                            className="
                                text-xl
                                font-semibold
                                mb-4
                            "
                        >
                            Attachment
                        </h2>

                        <a
                            href={
                                ticket.attachment
                                    ?.url
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="
                                inline-flex
                                bg-blue-600
                                px-5
                                py-3
                                rounded-xl
                                hover:bg-blue-700
                                transition-all
                            "
                        >
                            View Attachment
                        </a>

                    </section>

                )}

                {/* ADMIN ACTIONS */}

                {(user?.role === "admin" || isCurrentAssignee) && (

                    <section
                        className="
                            rounded-3xl
                            border
                            border-slate-800
                            bg-slate-900
                            p-6
                            sm:p-8
                        "
                    >

                        <h2
                            className="
                                text-2xl
                                font-bold
                                mb-6
                            "
                        >
                            {actionHeading}
                        </h2>

                        <div
                            className="
                                grid
                                gap-6
                                lg:grid-cols-2
                            "
                        >

                            <div>

                                <select
                                    value={
                                        selectedStatus
                                    }
                                    onChange={(e) =>
                                        setSelectedStatus(
                                            e.target
                                                .value
                                        )
                                    }
                                    className="
                                        w-full
                                        rounded-xl
                                        bg-slate-800
                                        border
                                        border-slate-700
                                        p-3
                                    "
                                >
                                    <option value="">
                                        Change Status
                                    </option>

                                    <option value="open">
                                        Open
                                    </option>

                                    <option value="in-progress">
                                        In Progress
                                    </option>

                                    <option value="resolved">
                                        Resolved
                                    </option>

                                    <option value="closed">
                                        Closed
                                    </option>

                                </select>

                                <button
                                    onClick={() =>
                                        handleStatusChange(
                                            selectedStatus
                                        )
                                    }
                                    className="
                                        mt-3
                                        w-full
                                        bg-blue-600
                                        hover:bg-blue-700
                                        py-3
                                        rounded-xl
                                        transition-all
                                    "
                                >
                                    Update Status
                                </button>

                            </div>

                            {canAssignTicket && (
                                <div>

                                    <select
                                        value={
                                            selectedAssigneeId
                                        }
                                        onChange={(e) =>
                                            setSelectedAssigneeId(
                                                e.target
                                                    .value
                                            )
                                        }
                                        className="
                                            w-full
                                            rounded-xl
                                            bg-slate-800
                                            border
                                            border-slate-700
                                            p-3
                                        "
                                    >
                                        <option value="">
                                            Assign User
                                        </option>

                                        {assignablePeople.map(
                                            (
                                                person
                                            ) => (
                                                <option
                                                    key={
                                                        person._id
                                                    }
                                                    value={
                                                        person._id
                                                    }
                                                >
                                                    {
                                                        person.username ||
                                                        person.email
                                                    }
                                                </option>
                                            )
                                        )}
                                    </select>

                                    <button
                                        onClick={() =>
                                            handleAssign(
                                                selectedAssigneeId
                                            )
                                        }
                                        className="
                                            mt-3
                                            w-full
                                            border
                                            border-slate-700
                                            hover:bg-slate-800
                                            py-3
                                            rounded-xl
                                            transition-all
                                        "
                                    >
                                        Assign Ticket
                                    </button>

                                </div>
                            )}

                        </div>

                    </section>

                )}

                {/* COMMENTS */}

                <section
                    className="
                        rounded-3xl
                        border
                        border-slate-800
                        bg-slate-900
                        p-6
                        sm:p-8
                    "
                >

                    <div
                        className="
                            flex
                            justify-between
                            items-center
                            mb-6
                        "
                    >

                        <h2
                            className="
                                text-2xl
                                font-bold
                            "
                        >
                            Comments
                        </h2>

                        <span
                            className="
                                text-slate-400
                                text-sm
                            "
                        >
                            {comments.length}
                            {" "}Comments
                        </span>

                    </div>

                    <div className="space-y-4">

                        {comments.length ===
                        0 ? (

                            <div
                                className="
                                    border
                                    border-dashed
                                    border-slate-700
                                    rounded-xl
                                    p-6
                                    text-slate-400
                                "
                            >
                                No comments yet.
                            </div>

                        ) : (

                            comments.map(
                                (comment) => (

                                    <div
                                        key={
                                            comment._id
                                        }
                                        className="
                                            bg-slate-800
                                            rounded-2xl
                                            p-4
                                            hover:bg-slate-700
                                            transition-all
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                justify-between
                                                flex-wrap
                                                gap-2
                                            "
                                        >

                                            <h4 className="font-semibold">
                                                {
                                                    comment
                                                        .user
                                                        ?.username
                                                }
                                            </h4>

                                            <span
                                                className="
                                                    text-xs
                                                    text-slate-400
                                                "
                                            >
                                                {new Date(
                                                    comment.createdAt
                                                ).toLocaleString()}
                                            </span>

                                        </div>

                                        <p
                                            className="
                                                mt-3
                                                text-slate-300
                                                break-words
                                            "
                                        >
                                            {
                                                comment.message
                                            }
                                        </p>

                                    </div>

                                )
                            )

                        )}

                    </div>

                    <div
                        className="
                            mt-6
                            flex
                            flex-col
                            sm:flex-row
                            gap-3
                        "
                    >

                        <input
                            value={message}
                            onChange={(e) =>
                                setMessage(
                                    e.target.value
                                )
                            }
                            placeholder="Write a comment..."
                            className="
                                flex-1
                                bg-slate-800
                                border
                                border-slate-700
                                rounded-xl
                                px-4
                                py-3
                                outline-none
                                focus:border-blue-500
                            "
                        />

                        <button
                            onClick={
                                handleAddComment
                            }
                            disabled={
                                addComment.isPending
                            }
                            className="
                                bg-blue-600
                                hover:bg-blue-700
                                px-6
                                py-3
                                rounded-xl
                                transition-all
                                disabled:opacity-50
                            "
                        >
                            {addComment.isPending
                                ? "Sending..."
                                : "Send"}
                        </button>

                    </div>

                </section>

            </div>

        </div>

    );
}