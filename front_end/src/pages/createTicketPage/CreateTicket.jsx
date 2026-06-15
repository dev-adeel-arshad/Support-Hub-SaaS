import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { ticketSchema } from "../../validator/ticketValidationSchema";
import { createTicket } from "../../services/ticketServices";
import { useCurrentUser } from "../../hooks/userHooks/useCurrentUser";

import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

export default function CreateTicket() {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { data: userData, isLoading: userLoading } = useCurrentUser();
    const user = userData?.data;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(ticketSchema),
    });

    const mutation = useMutation({
        mutationFn: createTicket,

        onSuccess: () => {

            toast.success("Ticket created successfully");

            queryClient.invalidateQueries({
                queryKey: ["tickets"],
            });

            queryClient.invalidateQueries({
                queryKey: ["all-tickets"],
            });

            navigate("/tickets");
        },

        onError: (error) => {

            toast.error(
                error?.response?.data?.message ||
                "Failed to create ticket"
            );

        },
    });

    const onSubmit = async (data) => {

        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("priority", data.priority);

        if (data.attachment?.[0]) {
            formData.append(
                "attachments",
                data.attachment[0]
            );
        }

        mutation.mutate(formData);
    };

    if (userLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">Loading...</div>;
    }

    if (user?.role === "admin") {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

            <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-8">

                <h1 className="text-3xl font-bold text-white mb-6">
                    Create Ticket
                </h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    <Input
                        label="Title"
                        register={register("title")}
                        error={errors.title}
                    />

                    <div>

                        <label className="text-slate-300">
                            Description
                        </label>

                        <textarea
                            {...register("description")}
                            rows={5}
                            className="
                                w-full
                                mt-2
                                bg-slate-800
                                border
                                border-slate-700
                                rounded-lg
                                p-3
                                text-white
                            "
                        />

                        {errors.description && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.description.message}
                            </p>
                        )}

                    </div>

                    <div>

                        <label className="text-slate-300">
                            Priority
                        </label>

                        <select
                            {...register("priority")}
                            className="
                                w-full
                                mt-2
                                bg-slate-800
                                border
                                border-slate-700
                                rounded-lg
                                p-3
                                text-white
                            "
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>

                    </div>

                    <Input
                        label="Attachment"
                        type="file"
                        register={register("attachment")}
                    />

                    <Button
                        type="submit"
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending
                            ? "Creating Ticket..."
                            : "Create Ticket"}
                    </Button>

                </form>

            </div>

        </div>
    );
}