import { loginSchema } from "../../validator/userDataValidator";

import { loginUser } from "../../services/authService";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate, Link } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

export default function Login() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const loginMutation = useMutation({
        mutationFn: loginUser,

        onSuccess: async (response) => {
            toast.success(
                response?.data?.message || "Login Successful"
            );

            await queryClient.invalidateQueries({
                queryKey: ["current-user"],
            });

            navigate("/");
        },

        onError: (error) => {
            toast.error(
                error?.response?.data?.message || "Login Failed"
            );
        },
    });

    const onSubmit = async (data) => {
        await loginMutation.mutateAsync(data);
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
            
            <div className="
                w-full max-w-md
                bg-slate-900
                border border-slate-800
                rounded-2xl
                p-8
                shadow-2xl
                transition-all
                duration-300
                hover:border-slate-700
            ">

                {/* HEADER */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white">
                        Welcome Back
                    </h1>

                    <p className="text-slate-400 mt-2 text-sm">
                        Login to continue to{" "}
                        <span className="text-blue-400 font-medium">
                            SupportHub
                        </span>
                    </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        register={register("email")}
                        error={errors.email}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        register={register("password")}
                        error={errors.password}
                    />

                    <Button
                        type="submit"
                        disabled={loginMutation.isPending}
                        className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                    >
                        {loginMutation.isPending
                            ? "Logging In..."
                            : "Login"}
                    </Button>
                </form>

                {/* FOOTER */}
                <div className="mt-8 text-center text-sm">
                    <p className="text-slate-400">
                        Don’t have an account?
                        <Link
                            to="/register-user"
                            className="ml-2 text-blue-400 hover:text-blue-300 font-medium transition"
                        >
                            Register
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}