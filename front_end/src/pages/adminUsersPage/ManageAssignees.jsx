import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import { useAssignees } from "../../hooks/userHooks/useAssignablePeople";
import { usePromoteAssignee } from "../../hooks/userHooks/usePromoteAssignee";
import { useDemoteAssignee } from "../../hooks/userHooks/useDemoteAssignee";

export default function ManageAssignees() {
    const [email, setEmail] = useState("");
    const queryClient = useQueryClient();
    const promoteAssignee = usePromoteAssignee();
    const demoteAssignee = useDemoteAssignee();

    const { data: assigneesData, isLoading } = useAssignees();
    const assignees = assigneesData?.data || [];

    const handleAddAssignee = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error("Email is required");
            return;
        }

        try {
            await promoteAssignee.mutateAsync(email);
            toast.success("User promoted to assignee");
            setEmail("");
            queryClient.invalidateQueries({ queryKey: ["assignees"] });
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to promote user");
        }
    };

    const handleRemoveAssignee = async (assigneeEmail) => {
        try {
            await demoteAssignee.mutateAsync(assigneeEmail);
            toast.success("User removed from assignees");
            queryClient.invalidateQueries({ queryKey: ["assignees"] });
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to remove assignee");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 px-6 py-12 text-white">
            <div className="mx-auto max-w-5xl space-y-8">
                {/* HEADER */}
                <section className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 p-8 shadow-xl">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-blue-400 uppercase tracking-widest text-sm">Admin Panel</p>
                            <h1 className="text-3xl md:text-4xl font-bold mt-2">Manage Assignees</h1>
                            <p className="text-slate-400 mt-3 max-w-2xl">
                                Add or remove team members from the assignee pool. Only assignees can be assigned tickets.
                            </p>
                        </div>
                        <Link
                            to="/profile"
                            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 font-medium text-center"
                        >
                            Back to Profile
                        </Link>
                    </div>
                </section>

                {/* ADD ASSIGNEE FORM */}
                <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
                    <h2 className="text-2xl font-bold mb-6">Add New Assignee</h2>

                    <form onSubmit={handleAddAssignee} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-slate-300">
                                Email Address
                            </label>
                            <div className="flex gap-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="user@example.com"
                                    className="flex-1 rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    disabled={promoteAssignee.isPending}
                                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {promoteAssignee.isPending ? "Adding..." : "Add Assignee"}
                                </button>
                            </div>
                        </div>
                    </form>
                </section>

                {/* ASSIGNEES LIST */}
                <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
                    <h2 className="text-2xl font-bold mb-6">Current Assignees ({assignees.length})</h2>

                    {isLoading ? (
                        <div className="text-center py-8 text-slate-400">Loading assignees...</div>
                    ) : assignees.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-slate-400">No assignees yet. Add one to get started.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {assignees.map((assignee) => (
                                <div
                                    key={assignee._id}
                                    className="flex items-center justify-between bg-slate-800 rounded-2xl p-4 hover:bg-slate-700 transition-all"
                                >
                                    <div>
                                        <p className="font-medium text-white">{assignee.username}</p>
                                        <p className="text-sm text-slate-400">{assignee.email}</p>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveAssignee(assignee.email)}
                                        disabled={demoteAssignee.isPending}
                                        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {demoteAssignee.isPending ? "Removing..." : "Remove"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* STATS */}
                <section className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-blue-500 transition-all">
                        <p className="text-slate-400 text-sm">Total Assignees</p>
                        <h3 className="text-3xl font-bold mt-2">{assignees.length}</h3>
                    </div>
                </section>
            </div>
        </div>
    );
}
