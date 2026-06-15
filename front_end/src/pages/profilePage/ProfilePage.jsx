import { Link } from "react-router-dom";

import { useCurrentUser } from "../../hooks/userHooks/useCurrentUser";

export default function ProfilePage() {
    const { data } = useCurrentUser();
    const user = data?.data;

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
            <div className="mx-auto max-w-5xl space-y-8">
                <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
                    <p className="text-sm font-medium uppercase tracking-wide text-blue-400">User Profile</p>
                    <h1 className="mt-3 text-4xl font-bold text-white">{user.username}</h1>
                    <p className="mt-2 text-slate-400">{user.email}</p>
                    <p className="mt-2 text-slate-400">Role: {user.role}</p>
                </section>

                <section className="grid gap-6 md:grid-cols-2">
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
                            <Link to="/admin/assignable" className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:bg-slate-800">
                                <h2 className="text-xl font-semibold text-white">Assignable People</h2>
                                <p className="mt-3 text-slate-400">Add or remove approved people admins can assign tickets to.</p>
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
                        </>
                    )}
                </section>
            </div>
        </div>
    );
}