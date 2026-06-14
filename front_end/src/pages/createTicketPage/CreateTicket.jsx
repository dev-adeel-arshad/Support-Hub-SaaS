import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ticketSchema } from "../../validator/ticketValidationSchema";

import {
    createTicket,
} from "../../services/ticketServices";

import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

export default function CreateTicket() {

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm({
        resolver: zodResolver(ticketSchema),
    });

    const mutation = useMutation({
        mutationFn: createTicket,
    });

    const onSubmit = async (data) => {

        try {

            const formData = new FormData();

            formData.append(
                "title",
                data.title
            );

            formData.append(
                "description",
                data.description
            );

            formData.append(
                "priority",
                data.priority
            );

            if (data.attachment?.[0]) {

                formData.append(
                    "attachments",
                    data.attachment[0]
                );

            }

            await mutation.mutateAsync(
                formData
            );

            await queryClient.invalidateQueries({
                queryKey: ["tickets"],
            });

            navigate("/tickets");

        } catch (error) {

            console.log(error);

        }
    };

    return (

        <div className="max-w-3xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">
                Create Ticket
            </h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5 bg-white p-6 rounded-xl shadow"
            >

                <Input
                    label="Title"
                    register={register("title")}
                    error={errors.title}
                />

                <div>

                    <label>
                        Description
                    </label>

                    <textarea
                        {...register("description")}
                        className="w-full border rounded-lg p-3 mt-2"
                        rows={5}
                    />

                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.description.message}
                        </p>
                    )}

                </div>

                <div>

                    <label>
                        Priority
                    </label>

                    <select
                        {...register("priority")}
                        className="w-full border rounded-lg p-3 mt-2"
                    >

                        <option value="low">
                            Low
                        </option>

                        <option value="medium">
                            Medium
                        </option>

                        <option value="high">
                            High
                        </option>

                    </select>

                </div>

                <Input
                    label="Attachment"
                    type="file"
                    register={register("attachment")}
                />

                <Button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {
                        isSubmitting
                            ? "Creating..."
                            : "Create Ticket"
                    }
                </Button>

            </form>

        </div>

    );
}