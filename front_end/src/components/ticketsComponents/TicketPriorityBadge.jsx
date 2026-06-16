export default function TicketPriorityBadge({ priority }) {
    const priorityStyles = {
        low: "bg-green-500/10 text-green-400 border-green-500/30",
        medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
        high: "bg-red-500/10 text-red-400 border-red-500/30",
    };

    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityStyles[priority] || "bg-slate-800 text-slate-300 border-slate-700"}`}
        >
            {priority}
        </span>
    );
}