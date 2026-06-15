import { Link, useNavigate } from "react-router-dom";

import { registerSchema } from "../../validator/userDataValidator";
import { registerUser } from "../../services/authService";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";

import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

export default function RegisterPage() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const registerMutation = useMutation({

        mutationFn: registerUser,

        onSuccess: (response) => {

            toast.success(
                response?.data?.message ||
                "Account Created Successfully"
            );

            navigate("/login");
        },

        onError: (error) => {

            toast.error(
                error?.response?.data?.message ||
                "Registration Failed"
            );

        },

    });

    const onSubmit = async (data) => {

        const formData = new FormData();

        formData.append(
            "username",
            data.username
        );

        formData.append(
            "email",
            data.email
        );

        formData.append(
            "password",
            data.password
        );

        if (data.profileImage?.[0]) {

            formData.append(
                "profileImage",
                data.profileImage[0]
            );

        }

        await registerMutation.mutateAsync(
            formData
        );
    };

    return (

        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

            <div
                className="
                    w-full
                    max-w-md
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-3xl
                    p-8
                    shadow-2xl
                "
            >

                <div className="text-center mb-8">

                    <div
                        className="
                            w-14
                            h-14
                            rounded-xl
                            bg-blue-600
                            flex
                            items-center
                            justify-center
                            text-white
                            font-bold
                            text-xl
                            mx-auto
                            mb-5
                        "
                    >
                        SH
                    </div>

                    <h1
                        className="
                            text-3xl
                            font-bold
                            text-white
                        "
                    >
                        Create Account
                    </h1>

                    <p
                        className="
                            text-slate-400
                            mt-3
                        "
                    >
                        Join SupportHub and start
                        managing support tickets.
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    <Input
                        label="Username"
                        type="text"
                        placeholder="Enter username"
                        register={register("username")}
                        error={errors.username}
                    />

                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter email"
                        register={register("email")}
                        error={errors.email}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter password"
                        register={register("password")}
                        error={errors.password}
                    />

                    <Input
                        label="Profile Image (Optional)"
                        type="file"
                        register={register("profileImage")}
                        error={errors.profileImage}
                    />

                    <Button
                        type="submit"
                        disabled={
                            registerMutation.isPending
                        }
                    >
                        {
                            registerMutation.isPending
                                ? "Creating Account..."
                                : "Create Account"
                        }
                    </Button>

                </form>

                <div
                    className="
                        mt-8
                        text-center
                    "
                >

                    <p
                        className="
                            text-slate-400
                        "
                    >
                        Already have an account?

                        <Link
                            to="/login"
                            className="
                                ml-2
                                text-blue-500
                                hover:text-blue-400
                                font-medium
                            "
                        >
                            Login
                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );
}