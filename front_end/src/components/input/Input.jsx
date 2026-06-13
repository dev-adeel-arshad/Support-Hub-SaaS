export default function Input({
    label,
    type = "text",
    placeholder,
    register,
    error,
}) {
    return (
        <div className="flex flex-col gap-2">
            <label
                className="
                    text-sm
                    font-medium
                    text-slate-700
                "
            >
                {label}
            </label>

            <input
                type={type}
                placeholder={placeholder}
                {...register}
                className="
                    rounded-lg
                    border
                    border-slate-300
                    px-4
                    py-3
                    outline-none
                    transition-all
                    duration-200
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-200
                "
            />

            {error && (
                <p
                    className="
                        text-sm
                        text-red-500
                    "
                >
                    {error.message}
                </p>
            )}
        </div>
    );
}