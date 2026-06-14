import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import {
    useAddComment,
} from "../../hooks/comment/useAddComment";

export default function CommentSection({
    ticketId,
    comments,
}) {

    const [message, setMessage] =
        useState("");

    const queryClient =
        useQueryClient();

    const mutation =
        useAddComment();

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            if (!message.trim())
                return;

            try {

                await mutation.mutateAsync({

                    ticketId,

                    message,

                });

                setMessage("");

                await queryClient.invalidateQueries({

                    queryKey: [
                        "comments",
                        ticketId,
                    ],

                });

            } catch (error) {

                console.log(error);

            }

        };

    return (

        <div className="mt-8">

            <div className="bg-white p-6 rounded-xl shadow">

                <h2 className="text-2xl font-semibold mb-4">
                    Comments
                </h2>

                <form
                    onSubmit={handleSubmit}
                >

                    <textarea
                        value={message}
                        onChange={(e) =>
                            setMessage(
                                e.target.value
                            )
                        }
                        rows={4}
                        className="w-full border rounded-lg p-3"
                        placeholder="Add comment..."
                    />

                    <button
                        className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-lg"
                    >
                        Add Comment
                    </button>

                </form>

            </div>

            <div className="space-y-4 mt-6">

                {comments.map(
                    (comment) => (

                        <div
                            key={comment._id}
                            className="bg-white p-4 rounded-xl shadow"
                        >

                            <h3 className="font-semibold">

                                {
                                    comment.user
                                        ?.username
                                }

                            </h3>

                            <p className="mt-2">

                                {
                                    comment.message
                                }

                            </p>

                        </div>

                    )
                )}

            </div>

        </div>

    );
}