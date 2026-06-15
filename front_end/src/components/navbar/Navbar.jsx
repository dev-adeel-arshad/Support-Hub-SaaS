import { Link } from "react-router-dom";

import { useCurrentUser } from "../../hooks/userHooks/useCurrentUser";

import GuestButtons from "../button/GuestButtons";

export default function Navbar() {

    const { data } = useCurrentUser();

    const user = data?.data;

    return (

        <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur border-b border-slate-800">

            <div className="max-w-7xl mx-auto px-6">

                <div className="h-20 flex items-center justify-between">

                    {/* LOGO */}

                    <Link
                        to="/"
                        className="flex items-center gap-3"
                    >

                        <div
                            className="
                                w-11
                                h-11
                                rounded-xl
                                bg-blue-600
                                flex
                                items-center
                                justify-center
                                text-white
                                font-bold
                                transition-all
                                duration-300
                                hover:scale-105
                            "
                        >
                            SH
                        </div>

                        <div>

                            <h2 className="font-bold text-xl text-white">
                                SupportHub
                            </h2>

                            <p className="text-xs text-slate-400">
                                Ticket Management
                            </p>

                        </div>

                    </Link>

                    {/* NAVIGATION */}

                    <nav>

                        <ul className="flex items-center gap-6">

                            <li>
                                <Link
                                    to="/"
                                    className="text-slate-300 hover:text-white transition"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/services"
                                    className="text-slate-300 hover:text-white transition"
                                >
                                    Our Services
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/contact-us"
                                    className="text-slate-300 hover:text-white transition"
                                >
                                    Contact Us
                                </Link>
                            </li>

                        </ul>

                    </nav>

                    {/* RIGHT SIDE */}

                    {user ? (

                        <Link
                            to="/profile"
                            className="
                                flex
                                items-center
                                gap-3
                                bg-slate-900
                                border
                                border-slate-800
                                px-4
                                py-2
                                rounded-xl
                                hover:border-blue-500
                                transition
                            "
                        >

                            <div
                                className="
                                    w-9
                                    h-9
                                    rounded-full
                                    bg-blue-600
                                    flex
                                    items-center
                                    justify-center
                                    text-white
                                    font-semibold
                                "
                            >
                                {user.username?.charAt(0)?.toUpperCase()}
                            </div>

                            <div>

                                <p className="text-white text-sm">
                                    {user.username}
                                </p>

                                <p className="text-slate-400 text-xs">
                                    {user.role}
                                </p>

                            </div>

                        </Link>

                    ) : (

                        <GuestButtons />

                    )}

                </div>

            </div>

        </header>

    );

}