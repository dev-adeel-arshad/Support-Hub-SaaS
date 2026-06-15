import { Link } from "react-router-dom";

import { useCurrentUser } from "../../hooks/userHooks/useCurrentUser";

export default function ServicesPage() {
    const { data } = useCurrentUser();
    const user = data?.data;

    return (
        <div className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
            <div className="mx-auto max-w-7xl space-y-10">
                <section className="max-w-4xl">
                    <p className="text-sm font-medium uppercase tracking-wide text-blue-400">Our Services</p>
                    <h1 className="mt-3 text-4xl font-bold text-white">Support services built around ticket resolution.</h1>
                    <p className="mt-4 text-slate-400">SupportHub keeps the support flow simple. A user opens a ticket, the request is tracked by status and priority, comments stay attached to the same issue, and admins handle the operational work in the background.</p>
                </section>

                <section className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-white">Ticket Creation</h2>
                        <p className="mt-3 text-slate-400">Open a new support request with a title, description, priority, and optional attachment. This is the core service for every signed-in user.</p>
                        <Link to={user ? "/create-ticket" : "/register-user"} className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700">Open Ticket</Link>
                    </div>

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-white">Ticket Tracking</h2>
                        <p className="mt-3 text-slate-400">Follow status updates from open to resolved and keep the full request history in one place. Users can always return to their own list to see what is active, what is done, and what still needs attention.</p>
                        <Link to={user ? "/tickets" : "/login"} className="mt-6 inline-flex rounded-xl border border-slate-700 px-5 py-3 text-white transition hover:bg-slate-800">View Tickets</Link>
                    </div>

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
                        <h2 className="text-xl font-semibold text-white">Comments and Collaboration</h2>
                        <p className="mt-3 text-slate-400">Add comments to keep the support conversation connected to the same ticket. Admins and users can both respond inside the same thread, so the context never gets lost.</p>
                        <Link to={user ? "/tickets" : "/login"} className="mt-6 inline-flex rounded-xl border border-slate-700 px-5 py-3 text-white transition hover:bg-slate-800">Continue</Link>
                    </div>
                </section>

                <section className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                        <h2 className="text-xl font-semibold text-white">What a user gets</h2>
                        <ul className="mt-4 space-y-3 text-slate-400">
                            <li>• A private list of their own submitted tickets.</li>
                            <li>• Status and priority filters for quick follow-up.</li>
                            <li>• Comment history attached to each ticket.</li>
                            <li>• A clean path from registration to ticket creation.</li>
                        </ul>
                    </div>

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                        <h2 className="text-xl font-semibold text-white">What an admin gets</h2>
                        <ul className="mt-4 space-y-3 text-slate-400">
                            <li>• Access to every ticket in the system.</li>
                            <li>• Status updates, assignment, and comments from one screen.</li>
                            <li>• A user directory for assigning work by email.</li>
                            <li>• Dashboard stats grouped by ticket status.</li>
                        </ul>
                    </div>
                </section>

                {user?.role === "admin" && (
                    <section className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900 p-6">
                        <h2 className="text-2xl font-semibold text-white">Admin Services</h2>
                        <p className="text-slate-400">These options are only visible to administrators.</p>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                                <h3 className="font-semibold text-white">Dashboard Analytics</h3>
                                <p className="mt-2 text-slate-400">Review grouped ticket counts by status.</p>
                            </div>
                            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                                <h3 className="font-semibold text-white">Status Management</h3>
                                <p className="mt-2 text-slate-400">Move tickets through open, in-progress, resolved, and closed.</p>
                            </div>
                            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                                <h3 className="font-semibold text-white">Assignment Control</h3>
                                <p className="mt-2 text-slate-400">Assign work to team members directly from ticket details.</p>
                            </div>
                            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                                <h3 className="font-semibold text-white">User Directory</h3>
                                <p className="mt-2 text-slate-400">Look up users and assign a ticket by email.</p>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}