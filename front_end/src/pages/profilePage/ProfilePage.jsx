import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useCurrentUser } from "../../hooks/userHooks/useCurrentUser";
import { useAssignedTickets } from "../../hooks/ticketHooks/useAssignedTickets";
import { useAssignees } from "../../hooks/userHooks/useAssignablePeople";
import { logoutUser } from "../../services/authService";

export default function ProfilePage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { data } = useCurrentUser();
    const user = data?.data;
    const { data: assignedData } = useAssignedTickets({ enabled: !!user });

    const logoutMutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            queryClient.setQueryData(["current-user"], null);
            queryClient.resetQueries({ queryKey: ["current-user"], exact: true, refetchInactive: true });
            queryClient.removeQueries({ queryKey: ["current-user"], exact: true });
            toast.success("Logged out successfully");
            navigate("/");
        },
        onError: () => {
            toast.error("Unable to logout. Please try again.");
        },
    });
    const assignedTickets = assignedData?.data || [];
    const { data: assigneesData } = useAssignees();
    const assignees = assigneesData?.data || [];

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
            <div className="mx-auto max-w-5xl space-y-8">
                <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-medium uppercase tracking-wide text-blue-400">User Profile</p>
                            <h1 className="mt-3 text-4xl font-bold text-white">{user.username}</h1>
                            <p className="mt-2 text-slate-400">{user.email}</p>
                            <p className="mt-2 text-slate-400">Role: {user.role}</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => logoutMutation.mutate()}
                            disabled={logoutMutation.isLoading}
                            className="inline-flex items-center justify-center rounded-3xl border border-red-500 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {logoutMutation.isLoading ? "Signing out..." : "Logout"}
                        </button>
                    </div>
                </section>

                <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {user.role === "admin" ? (
                        <>
                            <Link to="/dashboard" className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:bg-slate-800">
                                <h2 className="text-xl font-semibold text-white">Open Dashboard</h2>
                                <p className="mt-3 text-slate-400">Review analytics and manage tickets as an administrator.</p>
                            </Link>
                            <Link to="/admin/users" className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:bg-slate-800">
                                <h2 className="text-xl font-semibold text-white">User Directory</h2>
                                <p className="mt-3 text-slate-400">See all registered users and assign tickets by email.</p>
                            </Link>
                            <Link to="/admin/assignees" className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:bg-slate-800">
                                <h2 className="text-xl font-semibold text-white">Manage Assignees</h2>
                                <p className="mt-3 text-slate-400">Add or remove team members from the assignee pool.</p>
                                <p className="mt-4 text-2xl font-bold text-blue-400">{assignees.length} assignee{assignees.length !== 1 ? 's' : ''}</p>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/tickets" className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:bg-slate-800">
                                <h2 className="text-xl font-semibold text-white">My Tickets</h2>
                                <p className="mt-3 text-slate-400">See your own support requests.</p>
                            </Link>

                            <Link to="/create-ticket" className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:bg-slate-800">
                                <h2 className="text-xl font-semibold text-white">Create Ticket</h2>
                                <p className="mt-3 text-slate-400">Open a new request for the support team.</p>
                            </Link>

                            {(user?.role === "assignee" || assignedTickets.length > 0) && (
                                <Link to="/assigned" className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:bg-slate-800">
                                    <h2 className="text-xl font-semibold text-white">Assigned Tickets</h2>
                                    <p className="mt-3 text-slate-400">View tickets assigned to your account.</p>
                                </Link>
                            )}
                        </>
                    )}
                </section>
            </div>
        </div>
    );
}