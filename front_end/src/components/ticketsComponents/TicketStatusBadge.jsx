export default function TicketStatusBadge({ status }) {
    const statusStyles = {
        open: "bg-green-500/10 text-green-400 border-green-500/30",
        closed: "bg-red-500/10 text-red-400 border-red-500/30",
        pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
        resolved: "bg-blue-500/10 text-blue-400 border-blue-500/30",
        "in-progress": "bg-amber-500/10 text-amber-400 border-amber-500/30",
    };

    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[status] || "bg-slate-800 text-slate-300 border-slate-700"}`}
        >
            {status}
        </span>
    );
}