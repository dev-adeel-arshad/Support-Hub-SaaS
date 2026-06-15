import { Link } from "react-router-dom";

import { useCurrentUser } from "../../hooks/userHooks/useCurrentUser";

export default function HomePage() {

    const { data, isLoading } = useCurrentUser();

    const user = data?.data;
    const getStartedTo = user ? "/create-ticket" : "/register-user";
    const getStartedLabel = isLoading
        ? "Loading..."
        : user
            ? "Create Ticket"
            : "Get Started";

    return (

        <div className="bg-slate-950 text-slate-100">

            {/* HERO */}

            <section className="max-w-7xl mx-auto px-6 py-24">

                <div className="max-w-4xl">

                    <span className="inline-block px-4 py-2 rounded-full bg-blue-600/20 text-blue-400 text-sm">

                        Simple. Reliable. Organized.

                    </span>

                    <h1 className="text-5xl md:text-7xl font-bold mt-8 leading-tight">

                        SupportHub

                        <span className="block text-blue-500 mt-3">

                            Ticket Management
                            Made Easier

                        </span>

                    </h1>

                    <p className="mt-8 text-xl text-slate-400 leading-relaxed max-w-3xl">

                        SupportHub helps teams manage support requests
                        through a centralized platform where issues can
                        be created, tracked, discussed and resolved with
                        clarity and transparency.

                    </p>

                    <div className="flex flex-wrap gap-4 mt-10">

                        <Link
                            to={getStartedTo}
                            className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                        >
                            {getStartedLabel}
                        </Link>

                        <Link
                            to="/login"
                            className="px-8 py-4 rounded-xl border border-slate-700 hover:bg-slate-800 transition-all duration-300"
                        >
                            Login
                        </Link>

                    </div>

                    <div className="grid md:grid-cols-4 gap-6">

                        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:-translate-y-1 transition-all duration-300">

                            <h2 className="text-4xl font-bold text-blue-500">
                                Fast
                            </h2>

                            <p className="mt-2 text-slate-400">
                                Users can create a ticket in a few clear steps.
                            </p>

                        </div>

                        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:-translate-y-1 transition-all duration-300">

                            <h2 className="text-4xl font-bold text-blue-500">
                                Clear
                            </h2>

                            <p className="mt-2 text-slate-400">
                                Status, priority, and comments stay attached to the same request.
                            </p>

                        </div>

                        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:-translate-y-1 transition-all duration-300">

                            <h2 className="text-4xl font-bold text-blue-500">
                                Controlled
                            </h2>

                            <p className="mt-2 text-slate-400">
                                Admins manage ticket progress without exposing internal tools on the landing page.
                            </p>

                        </div>

                        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:-translate-y-1 transition-all duration-300">

                            <h2 className="text-4xl font-bold text-blue-500">
                                24/7
                            </h2>

                            <p className="mt-2 text-slate-400">
                                Always available for support requests.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            <section className="max-w-5xl mx-auto px-6 py-24 text-center">

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12">

                    <h2 className="text-4xl font-bold">

                        Ready To Get Started?

                    </h2>

                    <p className="text-slate-400 mt-6 max-w-2xl mx-auto">

                        Join SupportHub and simplify the way your team handles support requests.

                    </p>

                    <Link
                        to={getStartedTo}
                        className="inline-block mt-8 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all duration-300"
                    >
                        {getStartedLabel}
                    </Link>

                </div>

            </section>

        </div>

    );
}