import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCurrentUser } from "../../hooks/userHooks/useCurrentUser";

export default function ServicesPage() {
    const navigate = useNavigate();
    const { data } = useCurrentUser();
    const user = data?.data;

    const handleServiceClick = (serviceName, targetPath) => {
        if (!user) {
            toast.error(`Login to use ${serviceName}.`);
            navigate("/login");
            return;
        }

        navigate(targetPath);
    };

    return (
        <div className="bg-slate-950 text-white overflow-x-hidden">

            {/* HERO */}
            <section className="relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_50%)]" />

                <div className="relative w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 pb-14">

                    <span className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-400 tracking-wide">
                        SupportHub Services
                    </span>

                    <h1 className="mt-7 text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.06] tracking-tight">
                        Simplifying Support
                        <span className="block mt-2 text-blue-500">Ticket Management</span>
                        <span className="block">For Modern Teams</span>
                    </h1>

                    <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-400">
                        SupportHub provides a centralized system for creating, tracking,
                        managing and resolving support requests — keeping everything
                        organized and accessible for teams of any size.
                    </p>

                    <div className="mt-9 flex flex-wrap gap-4">
                        <button
                            type="button"
                            onClick={() => handleServiceClick("Ticket Creation", "/create-ticket")}
                            className="rounded-xl bg-blue-600 px-8 py-3.5 font-medium transition-all duration-300 hover:bg-blue-700 hover:scale-105"
                        >
                            Create Ticket
                        </button>
                        <button
                            type="button"
                            onClick={() => handleServiceClick("Ticket Tracking", "/tickets")}
                            className="rounded-xl border border-slate-700 px-8 py-3.5 font-medium transition-all duration-300 hover:bg-slate-900 hover:border-slate-600"
                        >
                            Explore Features
                        </button>
                    </div>

                </div>
            </section>

            {/* CORE SERVICES */}
            <section className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-16">

                <div className="mb-12">
                    <p className="text-blue-400 uppercase tracking-widest text-xs font-medium">What We Offer</p>
                    <h2 className="mt-4 text-3xl md:text-4xl font-bold">Core Services</h2>
                    <p className="mt-4 max-w-xl text-slate-400 text-base">
                        Everything needed to handle support requests from submission to resolution.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                    {/* Ticket Creation — has link */}
                    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-blue-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-blue-500/25 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
                        <div>
                            <h3 className="text-base font-semibold text-white">Ticket Creation</h3>
                            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                                Create support requests with detailed descriptions, priority levels
                                and optional file attachments to help administrators understand issues faster.
                            </p>
                        </div>
                        <div>
                            <div className="mt-4 h-px w-6 bg-blue-500/50 transition-all duration-500 group-hover:w-full group-hover:bg-blue-500/20" />
                            <button
                                type="button"
                                onClick={() => handleServiceClick("Ticket Creation", "/create-ticket")}
                                className="inline-block mt-4 text-blue-400 text-sm font-medium transition-colors duration-200 hover:text-blue-300"
                            >
                                Get Started →
                            </button>
                        </div>
                    </div>

                    {/* Ticket Tracking — has link */}
                    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-blue-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-blue-500/25 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
                        <div>
                            <h3 className="text-base font-semibold text-white">Ticket Tracking</h3>
                            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                                Track tickets through every stage including Open, In Progress,
                                Resolved and Closed while maintaining complete visibility at all times.
                            </p>
                        </div>
                        <div>
                            <div className="mt-4 h-px w-6 bg-blue-500/50 transition-all duration-500 group-hover:w-full group-hover:bg-blue-500/20" />
                            <button
                                type="button"
                                onClick={() => handleServiceClick("Ticket Tracking", "/tickets")}
                                className="inline-block mt-4 text-blue-400 text-sm font-medium transition-colors duration-200 hover:text-blue-300"
                            >
                                View Tickets →
                            </button>
                        </div>
                    </div>

                    {/* Comment System — has link */}
                    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-blue-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-blue-500/25 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
                        <div>
                            <h3 className="text-base font-semibold text-white">Comment System</h3>
                            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                                Keep discussions attached directly to tickets so administrators
                                and users can communicate without losing context across channels.
                            </p>
                        </div>
                        <div>
                            <div className="mt-4 h-px w-6 bg-blue-500/50 transition-all duration-500 group-hover:w-full group-hover:bg-blue-500/20" />
                            <button
                                type="button"
                                onClick={() => handleServiceClick("Comment System", "/tickets")}
                                className="inline-block mt-4 text-blue-400 text-sm font-medium transition-colors duration-200 hover:text-blue-300"
                            >
                                Continue →
                            </button>
                        </div>
                    </div>

                    {/* Ticket Status — has link, shows statuses */}
                    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-blue-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-blue-500/25 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
                        <div>
                            <h3 className="text-base font-semibold text-white">Ticket Status</h3>
                            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                                Every ticket moves through a clear lifecycle so users always know exactly where their request stands.
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {[
                                    { label: "Open",        color: "bg-blue-500/15 text-blue-400 border-blue-500/25" },
                                    { label: "In Progress", color: "bg-amber-500/15 text-amber-400 border-amber-500/25" },
                                    { label: "Resolved",    color: "bg-green-500/15 text-green-400 border-green-500/25" },
                                    { label: "Rejected",    color: "bg-red-500/15 text-red-400 border-red-500/25" },
                                    { label: "Closed",      color: "bg-slate-500/15 text-slate-400 border-slate-500/25" },
                                ].map((s) => (
                                    <span
                                        key={s.label}
                                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${s.color}`}
                                    >
                                        {s.label}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="mt-4 h-px w-6 bg-blue-500/50 transition-all duration-500 group-hover:w-full group-hover:bg-blue-500/20" />
                            <button
                                type="button"
                                onClick={() => handleServiceClick("Ticket Status", "/tickets")}
                                className="inline-block mt-4 text-blue-400 text-sm font-medium transition-colors duration-200 hover:text-blue-300"
                            >
                                View My Tickets →
                            </button>
                        </div>
                    </div>

                    {/* Priority Management — no link (admin) */}
                    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-blue-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-blue-500/25 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
                        <div>
                            <h3 className="text-base font-semibold text-white">Priority Management</h3>
                            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                                Set and manage priority levels so critical issues are always
                                addressed first without getting lost in the queue.
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {[
                                    { label: "Low",      color: "bg-slate-500/15 text-slate-400 border-slate-500/25" },
                                    { label: "Medium",   color: "bg-amber-500/15 text-amber-400 border-amber-500/25" },
                                    { label: "High",     color: "bg-orange-500/15 text-orange-400 border-orange-500/25" },
                                    { label: "Critical", color: "bg-red-500/15 text-red-400 border-red-500/25" },
                                ].map((p) => (
                                    <span
                                        key={p.label}
                                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${p.color}`}
                                    >
                                        {p.label}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4 h-px w-6 bg-blue-500/50 transition-all duration-500 group-hover:w-full group-hover:bg-blue-500/20" />
                    </div>

                    {/* Ticket Assignment — no link (admin) */}
                    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-blue-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-blue-500/25 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />
                        <div>
                            <h3 className="text-base font-semibold text-white">Ticket Assignment</h3>
                            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                                Administrators can assign tickets to specific team members,
                                ensuring the right person handles every support request efficiently.
                            </p>
                        </div>
                        <div className="mt-4 h-px w-6 bg-blue-500/50 transition-all duration-500 group-hover:w-full group-hover:bg-blue-500/20" />
                    </div>

                </div>

            </section>

            {/* BENEFITS */}
            <section className="bg-slate-900/50 border-y border-slate-800">
                <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-16">

                    <div className="text-center mb-12">
                        <p className="text-blue-400 uppercase tracking-widest text-xs font-medium">Built For Everyone</p>
                        <h2 className="mt-4 text-3xl md:text-4xl font-bold">Benefits That Matter</h2>
                        <p className="mt-4 max-w-xl mx-auto text-slate-400 text-base">
                            Whether you're submitting a ticket or managing hundreds, SupportHub delivers.
                        </p>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                        {[
                            {
                                title: "Benefits For Users",
                                items: [
                                    "Create tickets in seconds",
                                    "Monitor ticket progress in real time",
                                    "Priority-based support requests",
                                    "Attachment support for context",
                                    "Centralized communication thread",
                                    "Organized ticket history",
                                ],
                            },
                            {
                                title: "Benefits For Administrators",
                                items: [
                                    "Complete ticket oversight",
                                    "User management and role control",
                                    "Ticket assignment controls",
                                    "Status management tools",
                                    "Dashboard analytics at a glance",
                                    "Team collaboration workflow",
                                ],
                            },
                        ].map((block) => (
                            <div
                                key={block.title}
                                className="group relative rounded-2xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 overflow-hidden"
                            >
                                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-blue-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-blue-500/25 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />

                                <h2 className="text-xl font-bold text-white">{block.title}</h2>
                                <ul className="mt-6 space-y-3">
                                    {block.items.map((item) => (
                                        <li key={item} className="flex items-start gap-3 text-sm text-slate-400">
                                            <span className="mt-0.5 h-4 w-4 flex-shrink-0 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                                                <span className="block h-1.5 w-1.5 rounded-full bg-blue-400" />
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-6 h-px w-6 bg-blue-500/50 transition-all duration-500 group-hover:w-full group-hover:bg-blue-500/20" />
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-16">

                <div className="text-center mb-14">
                    <p className="text-blue-400 uppercase tracking-widest text-xs font-medium">The Process</p>
                    <h2 className="mt-4 text-3xl md:text-4xl font-bold">How It Works</h2>
                    <p className="mt-4 max-w-xl mx-auto text-slate-400 text-base">
                        From submission to resolution in a clear, structured flow.
                    </p>
                </div>

                <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-blue-500/0 via-blue-500/25 to-blue-500/0" />
                    {[
                        { label: "Submit Ticket",  sub: "Describe the issue with full context" },
                        { label: "Admin Reviews",  sub: "Ticket is assessed and prioritized" },
                        { label: "Work Begins",    sub: "Assigned agent starts resolving" },
                        { label: "Issue Closed",   sub: "Resolution confirmed and logged" },
                    ].map(({ label, sub }, index) => (
                        <div key={label} className="relative text-center flex flex-col items-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold shadow-lg shadow-blue-600/20 ring-4 ring-slate-950">
                                {index + 1}
                            </div>
                            <h3 className="mt-4 text-sm font-semibold text-white">{label}</h3>
                            <p className="mt-1 text-slate-500 text-xs leading-relaxed">{sub}</p>
                        </div>
                    ))}
                </div>

            </section>

            {/* ADMIN TOOLS — only for admins */}
            {user?.role === "admin" && (
                <section className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pb-16">
                    <div className="group relative rounded-3xl border border-blue-500/20 bg-slate-900/80 overflow-hidden transition-all duration-300 hover:border-blue-500/35">
                        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-blue-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-blue-500/25 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />

                        <div className="p-10 md:p-12">
                            <span className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-400 tracking-wide mb-5">
                                Admin Only
                            </span>
                            <h2 className="text-3xl font-bold">Administrator Tools</h2>
                            <p className="mt-3 text-slate-400 text-sm">Special capabilities available only to administrators.</p>

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-10">
                                {[
                                    { label: "Dashboard Analytics", sub: "Track ticket metrics and team performance" },
                                    { label: "Ticket Assignment",   sub: "Route tickets to the right agents" },
                                    { label: "Status Management",   sub: "Control ticket lifecycle and states" },
                                    { label: "User Directory",      sub: "Manage users, roles and access" },
                                ].map((tool) => (
                                    <div
                                        key={tool.label}
                                        className="group/tool relative rounded-xl border border-slate-800 bg-slate-950 p-5 transition-all duration-300 hover:border-blue-500/30 overflow-hidden"
                                    >
                                        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-blue-500/50 scale-x-0 group-hover/tool:scale-x-100 transition-transform duration-500 origin-left" />
                                        <h3 className="font-semibold text-sm text-white">{tool.label}</h3>
                                        <p className="mt-2 text-slate-500 text-xs leading-relaxed">{tool.sub}</p>
                                        <div className="mt-3 h-px w-4 bg-blue-500/40 transition-all duration-500 group-hover/tool:w-full group-hover/tool:bg-blue-500/15" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pb-16">
                <div className="group relative rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center overflow-hidden transition-all duration-300 hover:border-blue-500/25">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06),transparent_60%)]" />
                    <div className="absolute inset-x-0 top-0 h-[1.5px] bg-blue-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-blue-500/25 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />

                    <div className="relative">
                        <h2 className="text-3xl md:text-4xl font-bold">Ready To Manage Support Better?</h2>
                        <p className="mt-5 max-w-xl mx-auto text-slate-400 text-base">
                            Start organizing support tickets, tracking progress and collaborating
                            with your team through a single platform.
                        </p>
                        <button
                            type="button"
                            onClick={() => handleServiceClick("Ticket Creation", "/create-ticket")}
                            className="inline-block mt-8 rounded-xl bg-blue-600 px-9 py-3.5 font-medium transition-all duration-300 hover:bg-blue-700 hover:scale-105"
                        >
                            Get Started Today
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
}
