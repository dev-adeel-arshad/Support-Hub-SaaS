import { Link } from "react-router-dom";
import { useCurrentUser } from "../../hooks/userHooks/useCurrentUser";

export default function ServicesPage() {

    const { data } = useCurrentUser();

    const user = data?.data;

    return (

        <div className="min-h-screen bg-slate-950 text-slate-100">

            {/* HERO SECTION */}

            <section className="border-b border-slate-800">

                <div className="max-w-7xl mx-auto px-6 py-24">

                    <div className="max-w-4xl">

                        <p className="uppercase tracking-widest text-blue-400 text-sm font-medium">

                            SupportHub Services

                        </p>

                        <h1 className="mt-5 text-5xl font-bold leading-tight text-white">

                            Simplifying Support Ticket
                            Management For Modern Teams

                        </h1>

                        <p className="mt-6 text-lg text-slate-400 leading-relaxed">

                            SupportHub provides a centralized system
                            for creating, tracking, managing and
                            resolving support requests. Whether you
                            are an individual user submitting an issue
                            or an administrator managing hundreds of
                            tickets, SupportHub keeps everything
                            organized and accessible.

                        </p>

                        <div className="flex flex-wrap gap-4 mt-10">

                            <Link
                                to={
                                    user
                                        ? "/create-ticket"
                                        : "/register-user"
                                }
                                className="
                                    bg-blue-600
                                    hover:bg-blue-700
                                    px-6
                                    py-3
                                    rounded-xl
                                    font-medium
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                "
                            >
                                Create Ticket
                            </Link>

                            <Link
                                to={
                                    user
                                        ? "/tickets"
                                        : "/login"
                                }
                                className="
                                    border
                                    border-slate-700
                                    hover:border-blue-500
                                    px-6
                                    py-3
                                    rounded-xl
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                "
                            >
                                Explore Features
                            </Link>

                        </div>

                    </div>

                </div>

            </section>

            {/* SERVICES */}

            <section className="max-w-7xl mx-auto px-6 py-20">

                <div className="mb-12">

                    <h2 className="text-3xl font-bold text-white">

                        Core Services

                    </h2>

                    <p className="mt-3 text-slate-400">

                        Everything needed to handle support requests
                        from submission to resolution.

                    </p>

                </div>

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

                    {/* CARD 1 */}

                    <div
                        className="
                            group
                            rounded-3xl
                            border
                            border-slate-800
                            bg-slate-900
                            p-8
                            transition-all
                            duration-300
                            hover:border-blue-500
                            hover:-translate-y-2
                        "
                    >

                        <div className="text-4xl mb-5">
                            🎫
                        </div>

                        <h3 className="text-xl font-semibold text-white">

                            Ticket Creation

                        </h3>

                        <p className="mt-4 text-slate-400 leading-relaxed">

                            Create support requests with detailed
                            descriptions, priority levels and
                            optional file attachments to help
                            administrators understand issues faster.

                        </p>

                        <Link
                            to={
                                user
                                    ? "/create-ticket"
                                    : "/register-user"
                            }
                            className="inline-block mt-6 text-blue-400"
                        >
                            Get Started →
                        </Link>

                    </div>

                    {/* CARD 2 */}

                    <div
                        className="
                            group
                            rounded-3xl
                            border
                            border-slate-800
                            bg-slate-900
                            p-8
                            transition-all
                            duration-300
                            hover:border-blue-500
                            hover:-translate-y-2
                        "
                    >

                        <div className="text-4xl mb-5">
                            📊
                        </div>

                        <h3 className="text-xl font-semibold text-white">

                            Ticket Tracking

                        </h3>

                        <p className="mt-4 text-slate-400 leading-relaxed">

                            Track tickets through every stage
                            including Open, In Progress,
                            Resolved and Closed while maintaining
                            complete visibility.

                        </p>

                        <Link
                            to={
                                user
                                    ? "/tickets"
                                    : "/login"
                            }
                            className="inline-block mt-6 text-blue-400"
                        >
                            View Tickets →
                        </Link>

                    </div>

                    {/* CARD 3 */}

                    <div
                        className="
                            group
                            rounded-3xl
                            border
                            border-slate-800
                            bg-slate-900
                            p-8
                            transition-all
                            duration-300
                            hover:border-blue-500
                            hover:-translate-y-2
                        "
                    >

                        <div className="text-4xl mb-5">
                            💬
                        </div>

                        <h3 className="text-xl font-semibold text-white">

                            Comment System

                        </h3>

                        <p className="mt-4 text-slate-400 leading-relaxed">

                            Keep discussions attached directly to
                            tickets so administrators and users
                            can communicate without losing context.

                        </p>

                        <Link
                            to={
                                user
                                    ? "/tickets"
                                    : "/login"
                            }
                            className="inline-block mt-6 text-blue-400"
                        >
                            Continue →
                        </Link>

                    </div>

                </div>

            </section>

            {/* BENEFITS */}

            <section className="max-w-7xl mx-auto px-6 pb-20">

                <div className="grid lg:grid-cols-2 gap-8">

                    <div
                        className="
                            bg-slate-900
                            border
                            border-slate-800
                            rounded-3xl
                            p-8
                        "
                    >

                        <h2 className="text-2xl font-bold text-white">

                            Benefits For Users

                        </h2>

                        <ul className="mt-6 space-y-4 text-slate-400">

                            <li>✓ Create tickets in seconds</li>

                            <li>✓ Monitor ticket progress</li>

                            <li>✓ Priority based support requests</li>

                            <li>✓ Attachment support</li>

                            <li>✓ Centralized communication</li>

                            <li>✓ Organized ticket history</li>

                        </ul>

                    </div>

                    <div
                        className="
                            bg-slate-900
                            border
                            border-slate-800
                            rounded-3xl
                            p-8
                        "
                    >

                        <h2 className="text-2xl font-bold text-white">

                            Benefits For Administrators

                        </h2>

                        <ul className="mt-6 space-y-4 text-slate-400">

                            <li>✓ Complete ticket oversight</li>

                            <li>✓ User management</li>

                            <li>✓ Ticket assignment controls</li>

                            <li>✓ Status management tools</li>

                            <li>✓ Dashboard analytics</li>

                            <li>✓ Team collaboration workflow</li>

                        </ul>

                    </div>

                </div>

            </section>

            {/* ADMIN SECTION */}

            {user?.role === "admin" && (

                <section className="max-w-7xl mx-auto px-6 pb-20">

                    <div
                        className="
                            rounded-3xl
                            border
                            border-blue-900
                            bg-gradient-to-r
                            from-slate-900
                            to-slate-950
                            p-8
                        "
                    >

                        <h2 className="text-3xl font-bold text-white">

                            Administrator Tools

                        </h2>

                        <p className="mt-3 text-slate-400">

                            Special capabilities available only to
                            administrators.

                        </p>

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mt-10">

                            <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800">
                                <h3 className="font-semibold">
                                    Dashboard Analytics
                                </h3>
                            </div>

                            <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800">
                                <h3 className="font-semibold">
                                    Ticket Assignment
                                </h3>
                            </div>

                            <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800">
                                <h3 className="font-semibold">
                                    Status Management
                                </h3>
                            </div>

                            <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800">
                                <h3 className="font-semibold">
                                    User Directory
                                </h3>
                            </div>

                        </div>

                    </div>

                </section>

            )}

            {/* CTA */}

            <section className="border-t border-slate-800">

                <div className="max-w-5xl mx-auto px-6 py-20 text-center">

                    <h2 className="text-4xl font-bold text-white">

                        Ready To Manage Support Requests Better?

                    </h2>

                    <p className="mt-5 text-slate-400 max-w-2xl mx-auto">

                        Start organizing support tickets, tracking
                        progress and collaborating with your team
                        through a single platform.

                    </p>

                    <div className="mt-10">

                        <Link
                            to={
                                user
                                    ? "/create-ticket"
                                    : "/register-user"
                            }
                            className="
                                inline-flex
                                bg-blue-600
                                hover:bg-blue-700
                                px-8
                                py-4
                                rounded-xl
                                font-medium
                                transition-all
                                duration-300
                                hover:-translate-y-1
                            "
                        >
                            Get Started Today
                        </Link>

                    </div>

                </div>

            </section>

        </div>

    );

}