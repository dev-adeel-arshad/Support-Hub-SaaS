import { useCurrentUser } from "../../hooks/userHooks/useCurrentUser";
import { useAllUsers } from "../../hooks/userHooks/useAllUsers";
import { Link } from "react-router-dom";

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
    <div
        className="
            min-h-screen
            bg-linear-to-b
            from-slate-950
            via-slate-950
            to-slate-900
            text-white
            px-4
            sm:px-6
            lg:px-8
            py-8
        "
    >

        <div className="max-w-7xl mx-auto space-y-8">

            {/* HEADER */}

            <section
                className="
                    rounded-3xl
                    border
                    border-slate-800
                    bg-linear-to-r
                    from-slate-900
                    via-slate-900
                    to-blue-950
                    p-6
                    md:p-8
                    shadow-xl
                "
            >

                <div
                    className="
                        flex
                        flex-col
                        gap-6
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                    "
                >

                    <div>

                        <p
                            className="
                                text-blue-400
                                uppercase
                                tracking-widest
                                text-sm
                            "
                        >
                            Admin Panel
                        </p>

                        <h1
                            className="
                                text-3xl
                                md:text-4xl
                                font-bold
                                mt-2
                            "
                        >
                            User Management
                        </h1>

                        <p
                            className="
                                text-slate-400
                                mt-3
                                max-w-2xl
                            "
                        >
                            Manage registered users,
                            assign tickets and monitor
                            team members from a single place.
                        </p>

                    </div>

                    <Link
                        to="/all-tickets"
                        className="
                            bg-blue-600
                            hover:bg-blue-700
                            px-5
                            py-3
                            rounded-xl
                            transition-all
                            duration-300
                            hover:scale-105
                            font-medium
                            text-center
                        "
                    >
                        View All Tickets
                    </Link>

                </div>

            </section>

            {/* STATS */}

            <section
                className="
                    grid
                    gap-5
                    sm:grid-cols-2
                    md:grid-cols-3
                "
            >

                <div
                    className="
                        bg-slate-900
                        border
                        border-slate-800
                        rounded-3xl
                        p-6
                        transition-all
                        duration-300
                        hover:border-blue-500
                        hover:-translate-y-1
                    "
                >

                    <p className="text-slate-400">
                        Total Users
                    </p>

                    <h2
                        className="
                            text-4xl
                            font-bold
                            mt-3
                        "
                    >
                        {users.length}
                    </h2>

                </div>

                <div
                    className="
                        bg-slate-900
                        border
                        border-slate-800
                        rounded-3xl
                        p-6
                        transition-all
                        duration-300
                        hover:border-blue-500
                        hover:-translate-y-1
                    "
                >

                    <p className="text-slate-400">
                        Administrators
                    </p>

                    <h2
                        className="
                            text-4xl
                            font-bold
                            mt-3
                            text-blue-400
                        "
                    >
                        {
                            users.filter(
                                (u) =>
                                    u.role === "admin"
                            ).length
                        }
                    </h2>

                </div>

                <div
                    className="
                        bg-slate-900
                        border
                        border-slate-800
                        rounded-3xl
                        p-6
                        transition-all
                        duration-300
                        hover:border-blue-500
                        hover:-translate-y-1
                    "
                >

                    <p className="text-slate-400">
                        Regular Users
                    </p>

                    <h2
                        className="
                            text-4xl
                            font-bold
                            mt-3
                            text-green-400
                        "
                    >
                        {
                            users.filter(
                                (u) =>
                                    u.role === "user"
                            ).length
                        }
                    </h2>

                </div>

            </section>

            {/* USERS TABLE - Desktop View */}

            <section
                className="
                    hidden
                    lg:block
                    rounded-3xl
                    border
                    border-slate-800
                    bg-slate-900
                    overflow-hidden
                    shadow-xl
                "
            >

                <div
                    className="
                        px-6
                        py-5
                        border-b
                        border-slate-800
                    "
                >

                    <h2
                        className="
                            text-xl
                            font-semibold
                        "
                    >
                        Registered Users
                    </h2>

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr
                                className="
                                    bg-slate-950
                                    text-slate-400
                                "
                            >

                                <th className="p-5 text-left">
                                    User
                                </th>

                                <th className="p-5 text-left">
                                    Email
                                </th>

                                <th className="p-5 text-left">
                                    Role
                                </th>

                                <th className="p-5 text-left">
                                    Joined
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {users.map(
                                (userItem) => (

                                    <tr
                                        key={
                                            userItem._id
                                        }
                                        className="
                                            border-t
                                            border-slate-800
                                            hover:bg-slate-800/50
                                            transition-all
                                            duration-300
                                        "
                                    >

                                        <td className="p-5">

                                            <div
                                                className="
                                                    flex
                                                    items-center
                                                    gap-4
                                                "
                                            >

                                                <div
                                                    className="
                                                        w-10
                                                        h-10
                                                        rounded-full
                                                        bg-blue-600
                                                        flex
                                                        items-center
                                                        justify-center
                                                        font-bold
                                                    "
                                                >
                                                    {userItem.username
                                                        ?.charAt(
                                                            0
                                                        )
                                                        .toUpperCase()}
                                                </div>

                                                <span className="font-medium">
                                                    {
                                                        userItem.username
                                                    }
                                                </span>

                                            </div>

                                        </td>

                                        <td className="p-5 text-slate-300">
                                            {userItem.email}
                                        </td>

                                        <td className="p-5">

                                            <span
                                                className={`
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    text-xs
                                                    font-semibold
                                                    ${
                                                        userItem.role ===
                                                        "admin"
                                                            ? "bg-blue-500/20 text-blue-400"
                                                            : userItem.role === "assignee"
                                                                ? "bg-cyan-500/20 text-cyan-400"
                                                                : "bg-green-500/20 text-green-400"
                                                    }
                                                `}
                                            >
                                                {
                                                    userItem.role
                                                }
                                            </span>

                                        </td>

                                        <td className="p-5 text-slate-400">
                                            {new Date(
                                                userItem.createdAt
                                            ).toLocaleDateString()}
                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                </div>

            </section>

            {/* USERS CARDS - Mobile View */}

            <section className="lg:hidden">

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {users.map((userItem) => (
                        <div
                            key={userItem._id}
                            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-slate-700 transition-all"
                        >
                            <div className="space-y-3">
                                {/* Username and Avatar */}
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">
                                        {userItem.username?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">{userItem.username}</p>
                                        <p className="text-sm text-slate-400">{userItem.email}</p>
                                    </div>
                                </div>

                                {/* Role and Date */}
                                <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                                    <span
                                        className={`
                                            px-3
                                            py-1
                                            rounded-full
                                            text-xs
                                            font-semibold
                                            ${
                                                userItem.role === "admin"
                                                    ? "bg-blue-500/20 text-blue-400"
                                                    : userItem.role === "assignee"
                                                        ? "bg-cyan-500/20 text-cyan-400"
                                                        : "bg-green-500/20 text-green-400"
                                            }
                                        `}
                                    >
                                        {userItem.role}
                                    </span>
                                    <p className="text-sm text-slate-400">
                                        {new Date(userItem.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </section>

        </div>

    </div>
);
}
