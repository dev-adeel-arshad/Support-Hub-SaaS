import "./Login.css";

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
        <div className="login-page">

            <div className="login-container">

                <h1>SupportHub</h1>

                <p className="subtitle">
                    Welcome back! Sign in to continue.
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="login-form"
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