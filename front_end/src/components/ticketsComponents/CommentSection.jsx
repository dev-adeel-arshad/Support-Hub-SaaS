import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAddComment } from "../../hooks/comment/useAddComment";
import toast from "react-hot-toast";

export default function CommentSection({ ticketId, comments }) {
    const [message, setMessage] = useState("");
    const queryClient = useQueryClient();
    const mutation = useAddComment(ticketId);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        try {
            await mutation.mutateAsync({ ticketId, message });
            setMessage("");

            await queryClient.invalidateQueries({
                queryKey: ["comments", ticketId],
            });
        } catch (error) {
            toast.error("Failed to add comment");
        }
    };

    return (
        <div className="mt-10 space-y-6">

            {/* INPUT BOX */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur p-6 shadow-xl">

                <h2 className="text-xl font-semibold text-white mb-4">
                    Comments
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-white outline-none focus:border-blue-500 transition"
                        placeholder="Write your comment..."
                    />

                    <button
                        className="px-5 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                    >
                        Add Comment
                    </button>

                </form>
            </div>

            {/* COMMENTS LIST */}
            <div className="space-y-4">

                {comments.map((comment) => (
                    <div
                        key={comment._id}
                        className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5 hover:bg-slate-900/50 transition"
                    >
                        <h3 className="font-semibold text-blue-400">
                            {comment.user?.username}
                        </h3>

                        <p className="mt-2 text-slate-300">
                            {comment.message}
                        </p>
                    </div>
                ))}

            </div>
        </div>
    );
}