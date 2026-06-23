import { Link } from "react-router-dom";
import { useCurrentUser } from "../../hooks/userHooks/useCurrentUser";

export default function HomePage() {
    const { data, isLoading } = useCurrentUser();
    const user = data?.data;

    const primaryActionLink =
        user?.role === "admin" ? "/dashboard" : user ? "/create-ticket" : "/register-user";

    const primaryActionLabel =
        isLoading ? "Loading..." :
        user?.role === "admin" ? "Open Dashboard" :
        user ? "Create Ticket" : "Get Started";

    return (
        <div className="bg-slate-950 text-white overflow-x-hidden">

            {/* HERO — no min-h-screen, just top padding so stats cards are close below */}
            <section className="relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_45%)]" />

                <div className="relative w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 pb-14">

                    <span className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-400 tracking-wide">
                        Modern Ticket Management Platform
                    </span>

                    <h1 className="mt-7 text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.06] tracking-tight">
                        SupportHub
                        <span className="block mt-2 text-blue-500">
                            Ticketing made simple
                            <span className="block">and fast</span>
                        </span>
                    </h1>

                    <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-400">
                        Manage support requests in a structured way. Create tickets,
                        track progress, assign tasks, and solve issues without
                        confusion or scattered communication.
                    </p>

                    <div className="mt-9 flex flex-wrap gap-4">
                        <Link
                            to={primaryActionLink}
                            className="rounded-xl bg-blue-600 px-8 py-3.5 font-medium transition-all duration-300 hover:bg-blue-700 hover:scale-105"
                        >
                            {primaryActionLabel}
                        </Link>

                        {!user && (
                            <Link
                                to="/login"
                                className="rounded-xl border border-slate-700 px-8 py-3.5 font-medium transition-all duration-300 hover:bg-slate-900 hover:border-slate-600"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                </div>
            </section>

            {/* QUICK STATS */}
            <section className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pb-16">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: "Fast",  desc: "Create support tickets in seconds with a streamlined, intuitive workflow." },
                        { label: "Clear", desc: "Track ticket status, priorities, comments, and assignments at a glance." },
                        { label: "Smart", desc: "Admins can assign tickets and manage support operations efficiently." },
                        { label: "24/7",  desc: "Always available so teams and customers never miss a beat." },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-6 min-h-[170px] transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-slate-900 overflow-hidden"
                        >
                            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-blue-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-blue-500/25 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />

                            <span className="text-2xl font-bold text-blue-400 tracking-tight">{item.label}</span>
                            <div>
                                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                                <div className="mt-3 h-px w-6 bg-blue-500/50 transition-all duration-500 group-hover:w-full group-hover:bg-blue-500/30" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FEATURES */}
            <section className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-16">

                <div className="text-center mb-12">
                    <p className="text-blue-400 uppercase tracking-widest text-xs font-medium">Why Teams Choose SupportHub</p>
                    <h2 className="mt-4 text-3xl md:text-4xl font-bold">Everything needed to manage support</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-slate-400 text-base">
                        From ticket creation to final resolution, every interaction stays organized and accessible from one platform.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                        { title: "Ticket Creation",  desc: "Create detailed support requests with priorities and attachments." },
                        { title: "Status Tracking",  desc: "Follow progress from Open to Closed with full visibility." },
                        { title: "Assignments",      desc: "Assign tickets to approved team members effortlessly." },
                        { title: "Comments",         desc: "Keep communication attached directly to the ticket." },
                        { title: "Dashboard",        desc: "Monitor ticket performance and support workload." },
                        { title: "Admin Controls",   desc: "Manage users, assignments, and support operations." },
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="group relative rounded-2xl border border-slate-800 bg-slate-900 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 overflow-hidden"
                        >
                            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-blue-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-blue-500/25 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />

                            <h3 className="text-base font-semibold text-white">{item.title}</h3>
                            <p className="mt-3 text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                            <div className="mt-4 h-px w-6 bg-blue-500/50 transition-all duration-500 group-hover:w-full group-hover:bg-blue-500/20" />
                        </div>
                    ))}
                </div>

            </section>

            {/* WORKFLOW */}
            <section className="bg-slate-900/50 border-y border-slate-800">
                <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-16">

                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold">Simple Workflow</h2>
                        <p className="mt-4 text-slate-400 max-w-xl mx-auto text-base">
                            SupportHub keeps support operations structured and easy to follow.
                        </p>
                    </div>

                    <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-blue-500/0 via-blue-500/25 to-blue-500/0" />

                        {[
                            { step: "Create Ticket",    sub: "Submit a structured support request" },
                            { step: "Assign Ticket",    sub: "Route to the right team member" },
                            { step: "Discuss & Update", sub: "Collaborate with full context" },
                            { step: "Resolve Issue",    sub: "Close with complete history" },
                        ].map(({ step, sub }, index) => (
                            <div key={step} className="relative text-center flex flex-col items-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold shadow-lg shadow-blue-600/20 ring-4 ring-slate-950">
                                    {index + 1}
                                </div>
                                <h3 className="mt-4 text-sm font-semibold text-white">{step}</h3>
                                <p className="mt-1 text-slate-500 text-xs leading-relaxed">{sub}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* EVERYTHING IN ONE PLACE */}
            <section className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-16">

                <div className="group relative rounded-3xl border border-slate-800 bg-slate-900/80 overflow-hidden transition-all duration-300 hover:border-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/5">
                    <div className="absolute inset-x-0 top-0 h-[1.5px] bg-blue-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-blue-500/25 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />

                    <div className="grid md:grid-cols-5">
                        <div className="md:col-span-3 p-10 md:p-12">
                            <span className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-400 tracking-wide mb-5">
                                Centralized Platform
                            </span>
                            <h3 className="text-3xl md:text-4xl font-bold leading-snug">
                                Everything Stays<br />
                                <span className="text-blue-400">In One Place</span>
                            </h3>
                            <p className="mt-6 text-slate-400 leading-relaxed text-sm">
                                SupportHub removes messy communication from support workflows.
                                Instead of switching between emails, chats, spreadsheets,
                                and disconnected tools, every support request is managed
                                through structured tickets.
                            </p>
                            <p className="mt-4 text-slate-400 leading-relaxed text-sm">
                                All updates, comments, assignments, priorities, and ticket
                                history remain attached to the same record — so your team
                                always knows the latest status without digging through
                                multiple channels.
                            </p>
                            <Link
                                to={primaryActionLink}
                                className="inline-flex items-center gap-2 mt-8 rounded-xl bg-blue-600 px-7 py-3.5 font-medium text-sm transition-all duration-300 hover:bg-blue-700 hover:scale-105"
                            >
                                {primaryActionLabel}
                                <span className="text-blue-300">→</span>
                            </Link>
                        </div>

                        <div className="md:col-span-2 border-t md:border-t-0 md:border-l border-slate-800 bg-slate-950/40 p-10 md:p-12 flex flex-col justify-center gap-8">
                            {[
                                { value: "100%",   label: "Ticket Visibility",  sub: "Full history on every record" },
                                { value: "Zero",   label: "Context Switching",  sub: "Everything in one platform" },
                                { value: "Faster", label: "Issue Resolution",   sub: "Structured workflows cut delays" },
                            ].map((stat) => (
                                <div key={stat.label} className="group/stat">
                                    <div className="text-3xl font-bold text-blue-400 tracking-tight">{stat.value}</div>
                                    <div className="mt-1 text-white font-medium text-sm">{stat.label}</div>
                                    <div className="mt-1 text-slate-500 text-xs">{stat.sub}</div>
                                    <div className="mt-3 h-px w-6 bg-blue-500/50 transition-all duration-500 group-hover/stat:w-full group-hover/stat:bg-blue-500/20" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </section>

            {/* CTA */}
            <section className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pb-16">

                <div className="group relative rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center overflow-hidden transition-all duration-300 hover:border-blue-500/25">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06),transparent_60%)]" />
                    <div className="absolute inset-x-0 top-0 h-[1.5px] bg-blue-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-blue-500/25 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />

                    <div className="relative">
                        <h2 className="text-3xl md:text-4xl font-bold">Ready to streamline support?</h2>
                        <p className="mt-5 max-w-xl mx-auto text-slate-400 text-base">
                            Manage support requests, assignments, comments, and ticket workflows from one organized platform.
                        </p>
                        <Link
                            to={primaryActionLink}
                            className="inline-block mt-8 rounded-xl bg-blue-600 px-9 py-3.5 font-medium transition-all duration-300 hover:bg-blue-700 hover:scale-105"
                        >
                            {primaryActionLabel}
                        </Link>
                    </div>
                </div>

            </section>

        </div>
    );
}