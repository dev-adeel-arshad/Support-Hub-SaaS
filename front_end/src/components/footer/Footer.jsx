import { Link } from "react-router-dom";

import { useCurrentUser } from "../../hooks/userHooks/useCurrentUser";

export default function Footer() {

    const { data } = useCurrentUser();

    const user = data?.data;

    return (

        <footer className="bg-slate-950 border-t border-slate-800">

            <div className="max-w-7xl mx-auto px-6 py-14">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* BRAND */}

                    <div>

                        <div className="flex items-center gap-3">

                            <div
                                className="
                                    w-10
                                    h-10
                                    rounded-xl
                                    bg-blue-600
                                    flex
                                    items-center
                                    justify-center
                                    text-white
                                    font-bold
                                "
                            >
                                SH
                            </div>

                            <h3 className="text-white font-bold text-xl">

                                SupportHub

                            </h3>

                        </div>

                        <p className="mt-4 text-slate-400 leading-relaxed">

                            A simple and reliable ticket management
                            platform built to help teams organize,
                            track and resolve support requests.

                        </p>

                    </div>

                    {/* QUICK LINKS */}

                    <div>

                        <h4 className="text-white font-semibold mb-4">

                            Quick Links

                        </h4>

                        <ul className="space-y-3">

                            <li>

                                <Link
                                    to="/"
                                    className="text-slate-400 hover:text-white transition"
                                >
                                    Home
                                </Link>

                            </li>

                            {!user && (

                                <li>

                                    <Link
                                        to="/login"
                                        className="text-slate-400 hover:text-white transition"
                                    >
                                        Login
                                    </Link>

                                </li>

                            )}

                            {!user && (

                                <li>

                                    <Link
                                        to="/register-user"
                                        className="text-slate-400 hover:text-white transition"
                                    >
                                        Register
                                    </Link>

                                </li>

                            )}

                            {user && (

                                <li>

                                    <Link
                                        to="/profile"
                                        className="text-slate-400 hover:text-white transition"
                                    >
                                        Profile
                                    </Link>

                                </li>

                            )}


                        </ul>

                    </div>

                    {/* FEATURES */}

                    <div>

                        <h4 className="text-white font-semibold mb-4">

                            Features

                        </h4>

                        <ul className="space-y-3 text-slate-400">

                            <li>Ticket Tracking</li>

                            <li>Role Based Access</li>

                            <li>File Attachments</li>

                            <li>Comment System</li>

                        </ul>

                    </div>

                    {/* ABOUT */}

                    <div>

                        <h4 className="text-white font-semibold mb-4">

                            About

                        </h4>

                        <ul className="space-y-3 text-slate-400">

                            <li>Modern UI</li>

                            <li>Secure Authentication</li>

                            <li>Fast Performance</li>

                            <li>Easy To Use</li>

                        </ul>

                    </div>

                </div>

                <div
                    className="
                        mt-10
                        pt-8
                        border-t
                        border-slate-800
                        flex
                        flex-col
                        md:flex-row
                        justify-between
                        gap-4
                    "
                >

                    <p className="text-slate-500">

                        © 2026 SupportHub. All rights reserved.

                    </p>

                    <p className="text-slate-500">

                        Built with React, TanStack Query,
                        React Hook Form and Express.

                    </p>

                </div>

            </div>

        </footer>

    );

}