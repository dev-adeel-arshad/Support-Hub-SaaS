
import { loginSchema } from "../../validator/userDataValidator";
import { loginUser } from "../../services/authService";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

export default function Login() {

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        try {

            const result = await loginUser(data);

            console.log(result);

        } catch (error) {

            console.log(error);

        }
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
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? "Logging In..."
                        : "Login"}
                </Button>

            </form>

        </div>

    </div>
);
}