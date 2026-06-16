
export default function ContactPage() {

    return (

        <div className="min-h-screen bg-slate-950 text-white">

            {/* HERO */}

            <section className="px-6 pt-20 pb-16">

                <div className="max-w-7xl mx-auto">

                    <div className="max-w-3xl">

                        <span
                            className="
                                inline-flex
                                rounded-full
                                border
                                border-blue-500/30
                                bg-blue-500/10
                                px-4
                                py-2
                                text-sm
                                text-blue-400
                            "
                        >
                            Contact SupportHub
                        </span>

                        <h1
                            className="
                                mt-6
                                text-5xl
                                font-bold
                                leading-tight
                            "
                        >
                            Let's solve your
                            support challenges
                            together.
                        </h1>

                        <p
                            className="
                                mt-6
                                text-lg
                                text-slate-400
                                leading-relaxed
                            "
                        >
                            Whether you need help with ticket
                            management, user workflows,
                            assignments, comments, role-based
                            access, or platform guidance,
                            we're here to help.
                        </p>

                    </div>

                </div>

            </section>

            {/* CONTACT CARDS */}

            <section className="px-6">

                <div
                    className="
                        max-w-7xl
                        mx-auto
                        grid
                        gap-6
                        md:grid-cols-3
                    "
                >

                    <div
                        className="
                            rounded-3xl
                            border
                            border-slate-800
                            bg-slate-900
                            p-8
                            transition-all
                            duration-300
                            hover:border-blue-500
                            hover:-translate-y-1
                        "
                    >

                        <h2 className="text-2xl font-semibold">
                            Email Support
                        </h2>

                        <p className="mt-4 text-slate-400">
                            adeelarshad.dev@gmail.com
                        </p>

                        <p className="mt-4 text-slate-500">
                            Best for technical questions,
                            account assistance,
                            feature requests and
                            ticket-related discussions.
                        </p>

                    </div>

                    <div
                        className="
                            rounded-3xl
                            border
                            border-slate-800
                            bg-slate-900
                            p-8
                            transition-all
                            duration-300
                            hover:border-blue-500
                            hover:-translate-y-1
                        "
                    >

                        <h2 className="text-2xl font-semibold">
                            Phone Contact
                        </h2>

                        <p className="mt-4 text-slate-400">
                            0337 2188389
                        </p>

                        <p className="mt-4 text-slate-500">
                            Ideal for urgent inquiries,
                            project discussions,
                            collaboration opportunities,
                            and support consultations.
                        </p>

                    </div>

                    <div
                        className="
                            rounded-3xl
                            border
                            border-slate-800
                            bg-slate-900
                            p-8
                            transition-all
                            duration-300
                            hover:border-blue-500
                            hover:-translate-y-1
                        "
                    >

                        <h2 className="text-2xl font-semibold">
                            Response Time
                        </h2>

                        <p className="mt-4 text-slate-400">
                            Within 24 Hours
                        </p>

                        <p className="mt-4 text-slate-500">
                            Most support requests receive
                            a response within a single
                            business day depending on
                            complexity and priority.
                        </p>

                    </div>

                </div>

            </section>

            {/* WHY CONTACT US */}

            <section className="px-6 py-16">

                <div className="max-w-7xl mx-auto">

                    <div className="text-center mb-12">

                        <h2 className="text-4xl font-bold">
                            Why Reach Out?
                        </h2>

                        <p className="mt-4 text-slate-400">
                            SupportHub is designed to make
                            support management simple,
                            transparent and efficient.
                        </p>

                    </div>

                    <div
                        className="
                            grid
                            gap-6
                            md:grid-cols-2
                            lg:grid-cols-4
                        "
                    >

                        {[
                            {
                                title: "Ticket Assistance",
                                desc: "Get help creating, updating or tracking support tickets."
                            },
                            {
                                title: "Platform Guidance",
                                desc: "Learn how to make the most of the ticketing workflow."
                            },
                            {
                                title: "Admin Support",
                                desc: "Assistance with assignments, user management and dashboard usage."
                            },
                            {
                                title: "Technical Questions",
                                desc: "Discuss integrations, workflows and project-related concerns."
                            }
                        ].map((item) => (

                            <div
                                key={item.title}
                                className="
                                    rounded-3xl
                                    border
                                    border-slate-800
                                    bg-slate-900
                                    p-6
                                    transition-all
                                    duration-300
                                    hover:border-blue-500
                                    hover:-translate-y-1
                                "
                            >

                                <h3 className="font-semibold text-xl">
                                    {item.title}
                                </h3>

                                <p className="mt-3 text-slate-400">
                                    {item.desc}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>

            {/* COMMON QUESTIONS */}

            <section className="px-6">

                <div
                    className="
                        max-w-7xl
                        mx-auto
                        rounded-3xl
                        border
                        border-slate-800
                        bg-slate-900
                        p-10
                    "
                >

                    <h2 className="text-3xl font-bold">
                        Frequently Discussed Topics
                    </h2>

                    <div
                        className="
                            mt-8
                            grid
                            gap-6
                            md:grid-cols-2
                        "
                    >

                        <div>

                            <h3 className="font-semibold text-lg">
                                Account Issues
                            </h3>

                            <p className="mt-2 text-slate-400">
                                Login problems, account access,
                                password assistance and user
                                management questions.
                            </p>

                        </div>

                        <div>

                            <h3 className="font-semibold text-lg">
                                Ticket Management
                            </h3>

                            <p className="mt-2 text-slate-400">
                                Creating tickets, uploading
                                attachments, tracking status
                                updates and ticket resolution.
                            </p>

                        </div>

                        <div>

                            <h3 className="font-semibold text-lg">
                                Admin Dashboard
                            </h3>

                            <p className="mt-2 text-slate-400">
                                Dashboard analytics,
                                assignment workflows,
                                filtering and reporting.
                            </p>

                        </div>

                        <div>

                            <h3 className="font-semibold text-lg">
                                Collaboration
                            </h3>

                            <p className="mt-2 text-slate-400">
                                Comments, communication,
                                ticket ownership and
                                support team coordination.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* CTA */}

            <section className="px-6 py-16">

                <div
                    className="
                        max-w-7xl
                        mx-auto
                        rounded-3xl
                        bg-gradient-to-r
                        from-blue-600
                        to-blue-700
                        p-10
                        text-center
                    "
                >

                    <h2 className="text-4xl font-bold">
                        Need Immediate Assistance?
                    </h2>

                    <p className="mt-4 text-blue-100 max-w-2xl mx-auto">
                        The fastest way to get help is to create
                        a ticket inside SupportHub or reach out
                        directly using the contact information
                        above. You can:
                    </p>
                    <p className="mt-3 text-blue-50 max-w-2xl mx-auto text-sm">
                        📧 Send us an email for detailed inquiries • 📞 Call us for urgent matters
                    </p>

                    <div
                        className="
                            mt-8
                            flex
                            flex-wrap
                            justify-center
                            gap-4
                        "
                    >

                        <div
                            className="
                                rounded-xl
                                bg-white
                                px-6
                                py-3
                                font-semibold
                                text-blue-700
                                cursor-default
                            "
                        >
                            📧 Send Email
                        </div>

                        <div
                            className="
                                rounded-xl
                                border
                                border-white/30
                                px-6
                                py-3
                                font-semibold
                                text-white
                                cursor-default
                            "
                        >
                            📞 Call Us
                        </div>

                    </div>

                </div>

            </section>

        </div>

    );

}