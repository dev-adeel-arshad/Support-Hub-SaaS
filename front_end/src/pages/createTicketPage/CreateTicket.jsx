
import { useNavigate, Navigate } from "react-router-dom";

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

    const {
        data: userData,
        isLoading: userLoading,
    } = useCurrentUser();

    const user = userData?.data;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(ticketSchema),
    });

    const selectedPriority = watch("priority");

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
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 px-4 py-8 md:px-6 md:py-12">

            <div className="mx-auto max-w-4xl">

                {/* HERO */}

                <div className="mb-8 text-center">

                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white text-2xl font-bold mb-5 shadow-lg shadow-blue-500/20">
                        SH
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white">
                        Create Support Ticket
                    </h1>

                    <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
                        Describe your issue in detail and our team
                        will review it as quickly as possible.
                        Add attachments and select the appropriate
                        priority level for faster resolution.
                    </p>

                </div>

                {/* FORM CARD */}

                <div
                    className="
                        rounded-3xl
                        border
                        border-slate-800
                        bg-slate-900
                        p-6
                        md:p-8
                        shadow-xl
                        transition-all
                        duration-300
                    "
                >

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >

                        <Input
                            label="Ticket Title"
                            placeholder="Briefly describe your issue"
                            register={register("title")}
                            error={errors.title}
                        />

                        {/* DESCRIPTION */}

                        <div>

                            <label className="text-sm font-medium text-slate-300">
                                Description
                            </label>

                            <textarea
                                {...register("description")}
                                rows={6}
                                placeholder="Provide complete details about your issue..."
                                className="
                                    mt-2
                                    w-full
                                    rounded-xl
                                    border
                                    border-slate-700
                                    bg-slate-800
                                    px-4
                                    py-3
                                    text-white
                                    placeholder:text-slate-500
                                    outline-none
                                    transition-all
                                    duration-300
                                    focus:border-blue-500
                                    focus:ring-2
                                    focus:ring-blue-500/20
                                "
                            />

                            {errors.description && (
                                <p className="mt-2 text-sm text-red-400">
                                    {errors.description.message}
                                </p>
                            )}

                        </div>

                        {/* PRIORITY */}

                        <div>

                            <label className="text-sm font-medium text-slate-300">
                                Priority Level
                            </label>

                            <div className="mt-3 grid gap-3 md:grid-cols-3">

                                <label
                                    className={`
                                        cursor-pointer
                                        rounded-2xl
                                        border
                                        p-4
                                        transition-all
                                        duration-300
                                        ${
                                            selectedPriority === "low"
                                                ? "border-green-500 bg-green-500/10"
                                                : "border-slate-700 bg-slate-800"
                                        }
                                    `}
                                >
                                    <input
                                        type="radio"
                                        value="low"
                                        {...register("priority")}
                                        className="hidden"
                                    />

                                    <h3 className="font-semibold text-white">
                                        Low
                                    </h3>

                                    <p className="text-sm text-slate-400 mt-1">
                                        General inquiries and minor issues.
                                    </p>

                                </label>

                                <label
                                    className={`
                                        cursor-pointer
                                        rounded-2xl
                                        border
                                        p-4
                                        transition-all
                                        duration-300
                                        ${
                                            selectedPriority === "medium"
                                                ? "border-yellow-500 bg-yellow-500/10"
                                                : "border-slate-700 bg-slate-800"
                                        }
                                    `}
                                >
                                    <input
                                        type="radio"
                                        value="medium"
                                        {...register("priority")}
                                        className="hidden"
                                    />

                                    <h3 className="font-semibold text-white">
                                        Medium
                                    </h3>

                                    <p className="text-sm text-slate-400 mt-1">
                                        Requires attention but not urgent.
                                    </p>

                                </label>

                                <label
                                    className={`
                                        cursor-pointer
                                        rounded-2xl
                                        border
                                        p-4
                                        transition-all
                                        duration-300
                                        ${
                                            selectedPriority === "high"
                                                ? "border-red-500 bg-red-500/10"
                                                : "border-slate-700 bg-slate-800"
                                        }
                                    `}
                                >
                                    <input
                                        type="radio"
                                        value="high"
                                        {...register("priority")}
                                        className="hidden"
                                    />

                                    <h3 className="font-semibold text-white">
                                        High
                                    </h3>

                                    <p className="text-sm text-slate-400 mt-1">
                                        Critical issue requiring immediate attention.
                                    </p>

                                </label>

                            </div>

                        </div>

                        {/* ATTACHMENT */}

                        <div>

                            <label className="text-sm font-medium text-slate-300">
                                Attachment (Optional)
                            </label>

                            <div
                                className="
                                    mt-2
                                    rounded-2xl
                                    border-2
                                    border-dashed
                                    border-slate-700
                                    bg-slate-800/50
                                    p-6
                                    transition-all
                                    duration-300
                                    hover:border-blue-500
                                "
                            >

                                <Input
                                    type="file"
                                    register={register("attachment")}
                                />

                                <p className="mt-2 text-sm text-slate-500">
                                    Upload screenshots, documents, logs, or any
                                    files that help explain your issue.
                                </p>

                            </div>

                        </div>

                        {/* SUBMIT */}

                        <div className="pt-2">

                            <Button
                                type="submit"
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending
                                    ? "Creating Ticket..."
                                    : "Create Ticket"}
                            </Button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}
