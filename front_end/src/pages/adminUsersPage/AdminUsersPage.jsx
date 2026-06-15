import { useCurrentUser } from "../../hooks/userHooks/useCurrentUser";
import { useAllUsers } from "../../hooks/userHooks/useAllUsers";

export default function AdminUsersPage() {
    const { data: currentData, isLoading: currentLoading } = useCurrentUser();
    const user = currentData?.data;

    const {
        data: usersData,
        isLoading: usersLoading,
        isError: usersError,
    } = useAllUsers({ enabled: user?.role === "admin" });

    if (currentLoading || usersLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600">
                Loading users...
            </div>
        );
    }

    if (usersError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-red-500">
                Failed to load users.
            </div>
        );
    }

    const users = usersData?.data || [];

    return (
        <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
            <div className="mx-auto max-w-6xl space-y-6">
                <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm font-medium uppercase tracking-wide text-blue-600">Admin users</p>
                            <h1 className="mt-2 text-3xl font-bold text-slate-950">All registered users</h1>
                            <p className="mt-3 text-slate-600">Review users and assign tickets by email from the ticket details page.</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                            Total users: <span className="font-semibold text-slate-950">{users.length}</span>
                        </div>
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-slate-200 bg-slate-100">
                                <tr>
                                    <th className="px-4 py-3 text-sm font-semibold text-slate-600">Username</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-slate-600">Email</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-slate-600">Role</th>
                                    <th className="px-4 py-3 text-sm font-semibold text-slate-600">Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((userItem) => (
                                    <tr key={userItem._id} className="border-b hover:bg-slate-50">
                                        <td className="px-4 py-4 text-slate-900">{userItem.username}</td>
                                        <td className="px-4 py-4 text-slate-900">{userItem.email}</td>
                                        <td className="px-4 py-4 text-slate-900 capitalize">{userItem.role}</td>
                                        <td className="px-4 py-4 text-slate-900">{new Date(userItem.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}
