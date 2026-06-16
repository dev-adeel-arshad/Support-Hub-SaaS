import { Link } from "react-router-dom";
import { useCurrentUser } from "../../hooks/userHooks/useCurrentUser";

export default function HomePage() {
    const { data, isLoading } = useCurrentUser();

    const user = data?.data;

    const primaryActionLink =
        user?.role === "admin"
            ? "/dashboard"
            : user
                ? "/create-ticket"
                : "/register-user";

    const primaryActionLabel =
        isLoading
            ? "Loading..."
            : user?.role === "admin"
                ? "Open Dashboard"
                : user
                    ? "Create Ticket"
                    : "Get Started";

    return (
        <div className="bg-slate-950 text-white overflow-hidden">

            {/* HERO */}

            <section className="relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_45%)]" />

                <div className="relative max-w-7xl mx-auto px-6 pt-14 pb-20">

                    <div className="max-w-4xl">

                        <span className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
                            Modern Ticket Management Platform
                        </span>

                        <h1 className="mt-8 text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
                            SupportHub

                            <span className="block mt-3 text-blue-500">
                                Ticket Management
                                Made Easier
                            </span>
                        </h1>

                        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-slate-400">
                            SupportHub helps teams manage support requests
                            through a centralized platform where tickets can
                            be created, tracked, assigned, discussed, and
                            resolved with complete transparency.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">

                            <Link
                                to={primaryActionLink}
                                className="
                                    rounded-xl
                                    bg-blue-600
                                    px-8
                                    py-4
                                    font-medium
                                    transition-all
                                    duration-300
                                    hover:bg-blue-700
                                    hover:scale-105
                                "
                            >
                                {primaryActionLabel}
                            </Link>

                            {!user && (
                                <Link
                                    to="/login"
                                    className="
                                        rounded-xl
                                        border
                                        border-slate-700
                                        px-8
                                        py-4
                                        font-medium
                                        transition-all
                                        duration-300
                                        hover:bg-slate-900
                                        hover:border-slate-600
                                    "
                                >
                                    Login
                                </Link>
                            )}

                        </div>

                        {/* QUICK STATS */}

                        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                            <div className="group min-h-72 rounded-4xl border border-slate-800 bg-slate-900/90 p-7 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/30 shadow-xl shadow-black/10">
                                <h2 className="text-4xl font-bold text-blue-500">
                                    Fast
                                </h2>

                                <p className="mt-4 text-slate-400">
                                    Create support tickets in seconds with a streamlined workflow.
                                </p>
                            </div>

                            <div className="group min-h-72 rounded-4xl border border-slate-800 bg-slate-900/90 p-7 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/30 shadow-xl shadow-black/10">
                                <h2 className="text-4xl font-bold text-blue-500">
                                    Clear
                                </h2>

                                <p className="mt-4 text-slate-400">
                                    Track ticket status, priorities, comments, and assignments.
                                </p>
                            </div>

                            <div className="group min-h-72 rounded-4xl border border-slate-800 bg-slate-900/90 p-7 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/30 shadow-xl shadow-black/10">
                                <h2 className="text-4xl font-bold text-blue-500">
                                    Smart
                                </h2>

                                <p className="mt-4 text-slate-400">
                                    Admins can assign tickets and manage support operations efficiently.
                                </p>
                            </div>

                            <div className="group min-h-72 rounded-4xl border border-slate-800 bg-slate-900/90 p-7 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/30 shadow-xl shadow-black/10">
                                <h2 className="text-4xl font-bold text-blue-500">
                                    24/7
                                </h2>

                                <p className="mt-4 text-slate-400">
                                    Always available for teams and customers.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURES */}

            <section className="max-w-7xl mx-auto px-6 py-24">

                <div className="text-center mb-16">

                    <p className="text-blue-400 uppercase tracking-wider text-sm">
                        Why Teams Choose SupportHub
                    </p>

                    <h2 className="mt-4 text-4xl md:text-5xl font-bold">
                        Everything needed to manage support
                    </h2>

                    <p className="mt-5 max-w-3xl mx-auto text-slate-400 text-lg">
                        From ticket creation to final resolution, every interaction
                        stays organized and accessible from one platform.
                    </p>

                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {[
                        {
                            title: "Ticket Creation",
                            desc: "Create detailed support requests with priorities and attachments.",
                        },
                        {
                            title: "Status Tracking",
                            desc: "Follow progress from Open to Closed with full visibility.",
                        },
                        {
                            title: "Assignments",
                            desc: "Assign tickets to approved team members effortlessly.",
                        },
                        {
                            title: "Comments",
                            desc: "Keep communication attached directly to the ticket.",
                        },
                        {
                            title: "Dashboard",
                            desc: "Monitor ticket performance and support workload.",
                        },
                        {
                            title: "Admin Controls",
                            desc: "Manage users, assignments, and support operations.",
                        },
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="
                                rounded-3xl
                                border
                                border-slate-800
                                bg-slate-900
                                p-8
                                transition-all
                                duration-300
                                hover:-translate-y-2
                                hover:border-blue-500/30
                                hover:shadow-xl
                            "
                        >
                            <h3 className="text-xl font-semibold text-white">
                                {item.title}
                            </h3>

                            <p className="mt-4 text-slate-400">
                                {item.desc}
                            </p>
                        </div>
                    ))}

                </div>

            </section>

            {/* WORKFLOW */}

            <section className="bg-slate-900/50 border-y border-slate-800">

                <div className="max-w-7xl mx-auto px-6 py-24">

                    <div className="text-center">

                        <h2 className="text-4xl font-bold">
                            Simple Workflow
                        </h2>

                        <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
                            SupportHub keeps support operations structured and easy to follow.
                        </p>

                    </div>

                    <div className="mt-16 grid gap-8 md:grid-cols-4">

                        {[
                            "Create Ticket",
                            "Assign Ticket",
                            "Discuss & Update",
                            "Resolve Issue",
                        ].map((step, index) => (
                            <div
                                key={step}
                                className="text-center"
                            >
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold">
                                    {index + 1}
                                </div>

                                <h3 className="mt-5 text-xl font-semibold">
                                    {step}
                                </h3>
                            </div>
                        ))}

                    </div>

                </div>

            </section>

            {/* CTA */}

            <section className="max-w-6xl mx-auto px-6 py-12">

                <div className="rounded-4xl border border-slate-800 bg-slate-900 p-12 text-center">

                    <h2 className="text-4xl font-bold">
                        Ready to streamline support?
                    </h2>

                    <p className="mt-5 max-w-2xl mx-auto text-slate-400 text-lg">
                        Manage support requests, assignments, comments,
                        and ticket workflows from one organized platform.
                    </p>

                    <Link
                        to={primaryActionLink}
                        className="
                            inline-block
                            mt-8
                            rounded-xl
                            bg-blue-600
                            px-8
                            py-4
                            font-medium
                            transition-all
                            duration-300
                            hover:bg-blue-700
                            hover:scale-105
                        "
                    >
                        {primaryActionLabel}
                    </Link>

                </div>

            </section>

        </div>
    );
}