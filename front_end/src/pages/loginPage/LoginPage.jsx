import { loginSchema } from "../../validator/userDataValidator";

import { loginUser } from "../../services/authService";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useNavigate,Link } from "react-router-dom";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import toast from "react-hot-toast";

import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

export default function Login() {

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const loginMutation = useMutation({

        mutationFn: loginUser,

        onSuccess: async (response) => {

            toast.success(
                response?.data?.message ||
                "Login Successful"
            );

            await queryClient.invalidateQueries({
                queryKey: ["current-user"],
            });

            navigate("/");
        },

        onError: (error) => {

            toast.error(
                error?.response?.data?.message ||
                "Login Failed"
            );

        },

    });

    const onSubmit = async (data) => {

        await loginMutation.mutateAsync(data);

    };

    return (

        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

                <div className="mb-8 text-center">

                    <h1 className="text-3xl font-bold text-slate-800">

                        Welcome Back

                    </h1>

                    <p className="text-slate-500 mt-2">

                        Login to continue to SupportHub

                    </p>

                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter Email"
                        register={register("email")}
                        error={errors.email}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter Password"
                        register={register("password")}
                        error={errors.password}
                    />

                    <Button
                        type="submit"
                        disabled={loginMutation.isPending}
                    >
                        {
                            loginMutation.isPending
                                ? "Logging In..."
                                : "Login"
                        }
                    </Button>

                </form>
                <div className="mt-8 text-center">

                    <p className="text-slate-400">

                        Don't have an account?

                        <Link
                            to="/register-user"
                            className="
                ml-2
                text-blue-500
                hover:text-blue-400
                font-medium
            "
                        >
                            Register
                        </Link>

                    </p>

                </div>
            </div>

        </div>

    );
}