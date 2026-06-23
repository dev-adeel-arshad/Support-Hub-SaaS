export default function ContactPage() {

    return (
        <div className="bg-slate-950 text-white overflow-x-hidden">

            {/* HERO */}
            <section className="relative min-h-[55vh] flex flex-col justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_50%)]" />

                <div className="relative w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 pb-10">
                    <span className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-400 tracking-wide">
                        Contact SupportHub
                    </span>

                    <h1 className="mt-7 text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.06] tracking-tight">
                        Let's solve your
                        <span className="block mt-2 text-blue-500">support challenges</span>
                        <span className="block">together.</span>
                    </h1>

                    <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-400">
                        Whether you need help with ticket management, user workflows,
                        assignments, or platform guidance — we're here to help.
                    </p>
                </div>
            </section>

            {/* CONTACT CARDS */}
            <section className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pb-16">
                <div className="grid gap-4 md:grid-cols-3">
                    {[
                        {
                            title: "Email Support",
                            value: "adeelarshad.dev@gmail.com",
                            desc: "Best for technical questions, account assistance, feature requests and ticket-related discussions.",
                        },
                        {
                            title: "Phone Contact",
                            value: "0337 2188389",
                            desc: "Ideal for urgent inquiries, project discussions, collaboration opportunities, and support consultations.",
                        },
                        {
                            title: "Response Time",
                            value: "Within 24 Hours",
                            desc: "Most support requests receive a response within a single business day depending on complexity.",
                        },
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="group relative rounded-2xl border border-slate-800 bg-slate-900 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-slate-900 overflow-hidden"
                        >
                            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-blue-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-blue-500/25 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />

                            <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                            <p className="mt-3 text-blue-400 font-medium text-sm">{item.value}</p>
                            <p className="mt-3 text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                            <div className="mt-4 h-px w-6 bg-blue-500/50 transition-all duration-500 group-hover:w-full group-hover:bg-blue-500/20" />
                        </div>
                    ))}
                </div>
            </section>

            {/* WHY REACH OUT */}
            <section className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-16">

                <div className="text-center mb-12">
                    <p className="text-blue-400 uppercase tracking-widest text-xs font-medium">How We Can Help</p>
                    <h2 className="mt-4 text-3xl md:text-4xl font-bold">Why Reach Out?</h2>
                    <p className="mt-4 max-w-xl mx-auto text-slate-400 text-base">
                        SupportHub is designed to make support management simple, transparent, and efficient.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { title: "Ticket Assistance",   desc: "Get help creating, updating or tracking support tickets." },
                        { title: "Platform Guidance",   desc: "Learn how to make the most of the ticketing workflow." },
                        { title: "Admin Support",       desc: "Assistance with assignments, user management and dashboard usage." },
                        { title: "Technical Questions", desc: "Discuss integrations, workflows and project-related concerns." },
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="group relative rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 overflow-hidden"
                        >
                            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-blue-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-blue-500/25 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />

                            <h3 className="font-semibold text-base text-white">{item.title}</h3>
                            <p className="mt-3 text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                            <div className="mt-4 h-px w-6 bg-blue-500/50 transition-all duration-500 group-hover:w-full group-hover:bg-blue-500/20" />
                        </div>
                    ))}
                </div>

            </section>

            {/* FREQUENTLY DISCUSSED TOPICS */}
            <section className="bg-slate-900/50 border-y border-slate-800">
                <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-16">

                    <div className="mb-12">
                        <p className="text-blue-400 uppercase tracking-widest text-xs font-medium">Common Topics</p>
                        <h2 className="mt-4 text-3xl md:text-4xl font-bold">Frequently Discussed</h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {[
                            {
                                title: "Account Issues",
                                desc: "Login problems, account access, password assistance and user management questions.",
                            },
                            {
                                title: "Ticket Management",
                                desc: "Creating tickets, uploading attachments, tracking status updates and ticket resolution.",
                            },
                            {
                                title: "Admin Dashboard",
                                desc: "Dashboard analytics, assignment workflows, filtering and reporting.",
                            },
                            {
                                title: "Collaboration",
                                desc: "Comments, communication, ticket ownership and support team coordination.",
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="group relative rounded-2xl border border-slate-800 bg-slate-900 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 overflow-hidden"
                            >
                                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-blue-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-blue-500/25 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />

                                <h3 className="font-semibold text-base text-white">{item.title}</h3>
                                <p className="mt-3 text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                                <div className="mt-4 h-px w-6 bg-blue-500/50 transition-all duration-500 group-hover:w-full group-hover:bg-blue-500/20" />
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* EXTRA SECTION — Response Process */}
            <section className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-16">

                <div className="text-center mb-14">
                    <p className="text-blue-400 uppercase tracking-widest text-xs font-medium">What Happens Next</p>
                    <h2 className="mt-4 text-3xl md:text-4xl font-bold">Our Response Process</h2>
                    <p className="mt-4 max-w-xl mx-auto text-slate-400 text-base">
                        Every inquiry is handled with care and responded to as quickly as possible.
                    </p>
                </div>

                <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-blue-500/0 via-blue-500/25 to-blue-500/0" />

                    {[
                        { label: "You Reach Out",     sub: "Send an email or call us directly" },
                        { label: "We Review",         sub: "Your inquiry is read and assessed" },
                        { label: "We Respond",        sub: "A clear answer within 24 hours" },
                        { label: "Issue Resolved",    sub: "We follow up until fully resolved" },
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

            {/* CTA */}
            <section className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pb-16">

                <div className="group relative rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center overflow-hidden transition-all duration-300 hover:border-blue-500/25">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06),transparent_60%)]" />
                    <div className="absolute inset-x-0 top-0 h-[1.5px] bg-blue-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-blue-500/25 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />

                    <div className="relative">
                        <h2 className="text-3xl md:text-4xl font-bold">Need Immediate Assistance?</h2>
                        <p className="mt-5 max-w-xl mx-auto text-slate-400 text-base">
                            The fastest way to get help is to reach out directly using the contact
                            information above. We respond to every inquiry personally.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <a
                                href="mailto:adeelarshad.dev@gmail.com"
                                className="rounded-xl bg-blue-600 px-8 py-3.5 font-medium text-sm transition-all duration-300 hover:bg-blue-700 hover:scale-105"
                            >
                                Send Email
                            </a>
                            <a
                                href="tel:03372188389"
                                className="rounded-xl border border-slate-700 px-8 py-3.5 font-medium text-sm transition-all duration-300 hover:bg-slate-900 hover:border-slate-600"
                            >
                                Call Us
                            </a>
                        </div>
                    </div>
                </div>

            </section>

        </div>
    );
}