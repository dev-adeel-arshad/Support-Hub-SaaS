export default function Button({
    children,
    type = "button",
    disabled = false,
    onClick,
}) {
    return (
        <div className="w-full">
            <button
                type={type}
                disabled={disabled}
                onClick={onClick}
                className="
                    w-full
                    rounded-lg
                    bg-blue-600
                    px-4
                    py-3
                    font-semibold
                    text-white
                    transition-all
                    duration-200
                    hover:bg-blue-700
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "
            >
                {children}
            </button>
        </div>
    );
}