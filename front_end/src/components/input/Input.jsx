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
                    text-slate-300
                "
            >
                {label}
            </label>

            <input
                type={type}
                placeholder={placeholder}
                {...register}
                className="
                    w-full
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-800
                    text-white
                    placeholder:text-slate-500
                    px-4
                    py-3
                    outline-none
                    transition-all
                    duration-300
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/30
                "
            />

            {error && (
                <p className="text-sm text-red-400">
                    {error.message}
                </p>
            )}

        </div>
    );
}