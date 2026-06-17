

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

        <div
            className="
                min-h-screen
                bg-slate-950
                flex
                items-center
                justify-center
                px-4
                py-12
            "
        >

            <div
                className="
                    w-full
                    max-w-lg
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-3xl
                    p-6
                    md:p-10
                    shadow-2xl
                    transition-all
                    duration-300
                    hover:border-blue-500
                "
            >

                {/* LOGO */}

                <div className="text-center mb-8">

                    <div
                        className="
                            w-16
                            h-16
                            rounded-2xl
                            bg-blue-600
                            flex
                            items-center
                            justify-center
                            text-white
                            font-bold
                            text-2xl
                            mx-auto
                            mb-5
                            shadow-lg
                        "
                    >
                        SH
                    </div>

                    <h1
                        className="
                            text-3xl
                            md:text-4xl
                            font-bold
                            text-white
                        "
                    >
                        Create Account
                    </h1>

                    <Link
                        to="/"
                        className="mt-4 inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-300 hover:border-blue-500 hover:text-white transition"
                    >
                        Back to Home
                    </Link>

                    <p
                        className="
                            text-slate-400
                            mt-3
                            leading-relaxed
                        "
                    >
                        Join SupportHub and manage your
                        support requests in a simple,
                        organized and professional way.
                    </p>

                </div>

                {/* FORM */}

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
                        label="Email Address"
                        type="email"
                        placeholder="Enter email address"
                        register={register("email")}
                        error={errors.email}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Create password"
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
                        disabled={registerMutation.isPending}
                    >
                        {
                            registerMutation.isPending
                                ? "Creating Account..."
                                : "Create Account"
                        }
                    </Button>

                </form>

                {/* LOGIN LINK */}

                <div className="mt-8 text-center">

                    <p className="text-slate-400">

                        Already have an account?

                        <Link
                            to="/login"
                            className="
                                ml-2
                                text-blue-500
                                hover:text-blue-400
                                font-medium
                                transition-colors
                            "
                        >
                            Login
                        </Link>

                    </p>

                </div>

                {/* EXTRA INFO */}

                <div
                    className="
                        mt-8
                        pt-6
                        border-t
                        border-slate-800
                        text-center
                    "
                >

                    <p className="text-sm text-slate-500">

                        By creating an account, you can
                        submit tickets, track their status,
                        upload attachments and communicate
                        with support staff through comments.

                    </p>

                </div>

            </div>

        </div>

    );

}