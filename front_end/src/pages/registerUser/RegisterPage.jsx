
import { registerSchema } from "../../validator/userDataValidator";
import { registerUser } from "../../services/authService.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/input/Input.jsx";
import Button from "../../components/button/Button.jsx";


export default function RegisterUser() {

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        }
    } = useForm({ resolver: zodResolver(registerSchema) })

   const onSubmit = async (data) => {
    try {
        console.log(data);
        const formData = new FormData();

        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("password", data.password);

        if (data.profileImage?.[0]) {
            formData.append("profileImage", data.profileImage[0]);
        }
console.log("Username:", formData.get("username"));
console.log("Email:", formData.get("email"));
console.log("Password:", formData.get("password"));
console.log("Profile Image File:", data.profileImage);
console.log("Profile:", formData.get("profileImage"));
        const result = await registerUser(formData);

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
                    Create Account
                </h1>

                <p className="text-slate-500 mt-2">
                    Join SupportHub and start managing tickets
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >
                <Input
                    label="Username"
                    type="text"
                    placeholder="Enter Username"
                    register={register("username")}
                    error={errors.username}
                />

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

                <Input
                    label="Profile Image (Optional)"
                    type="file"
                    register={register("profileImage")}
                    error={errors.profileImage}
                />

                <Button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? "Creating Account..."
                        : "Create Account"}
                </Button>
            </form>
        </div>
    </div>
);
} 