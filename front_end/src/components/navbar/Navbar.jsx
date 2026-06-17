
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";

// import { useCurrentUser } from "../../hooks/userHooks/useCurrentUser";
// import GuestButtons from "../button/GuestButtons";

// export default function Navbar() {

//     const [isOpen, setIsOpen] = useState(false);

//     const { data } = useCurrentUser();

//     const user = data?.data;

//     useEffect(() => {
//         if (!isOpen) return;

//         const handleEscape = (event) => {
//             if (event.key === "Escape") {
//                 setIsOpen(false);
//             }
//         };

//         document.addEventListener("keydown", handleEscape);

//         return () => {
//             document.removeEventListener("keydown", handleEscape);
//         };
//     }, [isOpen]);

//     return (

//         <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur border-b border-slate-800">

//             <div className="max-w-7xl mx-auto px-4 md:px-6">

//                 <div className="h-20 flex items-center justify-between">

//                     {/* LOGO */}

//                     <Link
//                         to="/"
//                         className="flex items-center gap-3"
//                     >
//                         <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
//                             SH
//                         </div>

//                         <div>
//                             <h2 className="font-bold text-xl text-white">
//                                 SupportHub
//                             </h2>

//                             <p className="text-xs text-slate-400">
//                                 Ticket Management
//                             </p>
//                         </div>
//                     </Link>

//                     {/* DESKTOP NAV */}

//                     <nav className="hidden md:block">

//                         <ul className="flex items-center gap-8">

//                             <li>
//                                 <Link
//                                     to="/"
//                                     className="text-slate-300 hover:text-white"
//                                 >
//                                     Home
//                                 </Link>
//                             </li>

//                             <li>
//                                 <Link
//                                     to="/services"
//                                     className="text-slate-300 hover:text-white"
//                                 >
//                                     Services
//                                 </Link>
//                             </li>

//                             <li>
//                                 <Link
//                                     to="/contact-us"
//                                     className="text-slate-300 hover:text-white"
//                                 >
//                                     Contact
//                                 </Link>
//                             </li>

//                         </ul>

//                     </nav>

//                     {/* RIGHT SIDE */}

//                     <div className="hidden md:flex">

//                         {user ? (

//                             <Link
//                                 to="/profile"
//                                 className="
//                                     flex
//                                     items-center
//                                     gap-3
//                                     bg-slate-900
//                                     border
//                                     border-slate-800
//                                     px-4
//                                     py-2
//                                     rounded-xl
//                                     hover:border-blue-500
//                                     transition
//                                 "
//                             >

//                                 <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white">
//                                     {user.username?.charAt(0)?.toUpperCase()}
//                                 </div>

//                                 <div>
//                                     <p className="text-white text-sm">
//                                         {user.username}
//                                     </p>

//                                     <p className="text-slate-400 text-xs">
//                                         {user.role}
//                                     </p>
//                                 </div>

//                             </Link>

//                         ) : (
//                             <GuestButtons />
//                         )}

//                     </div>

//                     {/* MOBILE MENU BUTTON */}

//                     <button
//                         onClick={() => setIsOpen((prev) => !prev)}
//                         aria-expanded={isOpen}
//                         aria-controls="mobile-menu"
//                         className="
//                             md:hidden
//                             text-white
//                             text-2xl
//                             p-3
//                             rounded-xl
//                             hover:bg-slate-900/80
//                             transition
//                         "
//                     >
//                         {isOpen ? "✕" : "☰"}
//                     </button>

//                 </div>

//                 {/* MOBILE MENU */}

//                 {isOpen && (
//                     <div className="md:hidden">
//                         <div
//                             className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm"
//                             onClick={() => setIsOpen(false)}
//                         />

//                         <div
//                             id="mobile-menu"
//                             className="fixed right-0 top-20 z-50 w-full max-w-sm bg-slate-950/95 border-l border-slate-800 border-b border-slate-800 p-5 shadow-2xl"
//                         >
//                             <div className="flex flex-col gap-4">
//                                 <Link
//                                     to="/"
//                                     onClick={() => setIsOpen(false)}
//                                     className="text-slate-300"
//                                 >
//                                     Home
//                                 </Link>

//                                 <Link
//                                     to="/services"
//                                     onClick={() => setIsOpen(false)}
//                                     className="text-slate-300"
//                                 >
//                                     Services
//                                 </Link>

//                                 <Link
//                                     to="/contact-us"
//                                     onClick={() => setIsOpen(false)}
//                                     className="text-slate-300"
//                                 >
//                                     Contact
//                                 </Link>

//                                 <div className="pt-3 border-t border-slate-800">
//                                     {user ? (
//                                         <Link
//                                             to="/profile"
//                                             onClick={() => setIsOpen(false)}
//                                             className="text-white"
//                                         >
//                                             Profile
//                                         </Link>
//                                     ) : (
//                                         <GuestButtons />
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//             </div>

//         </header>
//     );
// }

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useCurrentUser } from "../../hooks/userHooks/useCurrentUser";
import GuestButtons from "../button/GuestButtons";
import { logoutUser } from "../../services/authService";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data } = useCurrentUser();
    const user = data?.data;

    const logoutMutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            queryClient.setQueryData(["current-user"], null);
            queryClient.resetQueries({ queryKey: ["current-user"], exact: true, refetchInactive: true });
            queryClient.removeQueries({ queryKey: ["current-user"], exact: true });
            setIsOpen(false);
            toast.success("Logged out successfully");
            navigate("/");
        },
        onError: () => {
            toast.error("Unable to logout. Please try again.");
        },
    });


    // outside click close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!isOpen || !menuRef.current) return;

            const target = event.target;
            if (
                menuRef.current.contains(target) ||
                buttonRef.current?.contains(target)
            ) {
                return;
            }

            setIsOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
    }, [isOpen]);

    return (
        <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="h-20 flex items-center justify-between">

                    {/* LOGO */}
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-3xl bg-blue-600/95 border border-white/10 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-500/20">
                            SH
                        </div>

                        <div>
                            <h2 className="font-extrabold text-xl uppercase tracking-[0.18em] text-white">
                                SupportHub
                            </h2>
                            <p className="text-xs text-slate-400">
                                Ticket Management
                            </p>
                        </div>
                    </Link>

                    {/* DESKTOP NAV */}
                    <nav className="hidden md:block">
                        <ul className="flex items-center gap-8">
                            <li>
                                <Link className="text-slate-300 hover:text-white" to="/">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link className="text-slate-300 hover:text-white" to="/services">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link className="text-slate-300 hover:text-white" to="/contact-us">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* DESKTOP USER */}
                    <div className="hidden md:flex">
                        {user ? (
                            <Link
                                to="/profile"
                                className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-2xl hover:border-blue-500 transition"
                            >
                                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                                    {user.username?.charAt(0)?.toUpperCase()}
                                </div>

                                <div>
                                    <p className="text-white text-sm font-semibold">
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

                    {/* HAMBURGER */}
                    <button
                        type="button"
                        ref={buttonRef}
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="md:hidden text-white p-3 rounded-xl hover:bg-slate-900/80 transition"
                    >
                        <span className="text-2xl">
                            {isOpen ? "✕" : "☰"}
                        </span>
                    </button>
                </div>
            </div>

            {/* MOBILE DROPDOWN */}
            <div
                className={`md:hidden fixed top-20 right-4 z-40 transition-all duration-300 ${
                    isOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                }`}
            >
                <div
                    ref={menuRef}
                    className={`w-72 bg-slate-950/95 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
                        isOpen
                            ? "scale-100 translate-y-0"
                            : "scale-95 -translate-y-2"
                    }`}
                >
                    <div className="p-4 flex flex-col gap-2">

                        <Link
                            to="/"
                            onClick={() => setIsOpen(false)}
                            className="px-3 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 transition"
                        >
                            Home
                        </Link>

                        <Link
                            to="/services"
                            onClick={() => setIsOpen(false)}
                            className="px-3 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 transition"
                        >
                            Services
                        </Link>

                        <Link
                            to="/contact-us"
                            onClick={() => setIsOpen(false)}
                            className="px-3 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 transition"
                        >
                            Contact
                        </Link>

                        <div className="border-t border-slate-800 my-2" />

                        {user ? (
                            <>
                                <Link
                                    to="/profile"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500 transition"
                                >
                                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                                        {user.username?.charAt(0)?.toUpperCase()}
                                    </div>

                                    <div>
                                        <p className="text-white text-sm font-semibold">
                                            {user.username}
                                        </p>
                                        <p className="text-slate-400 text-xs">
                                            {user.role}
                                        </p>
                                    </div>
                                </Link>

                                <button
                                    type="button"
                                    disabled={logoutMutation.isLoading}
                                    onClick={() => logoutMutation.mutate()}
                                    className="w-full text-left px-3 py-3 rounded-xl bg-slate-900/90 text-red-400 hover:text-white hover:bg-slate-800 transition disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {logoutMutation.isLoading ? "Signing out..." : "Logout"}
                                </button>
                            </>
                        ) : (
                            <GuestButtons />
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}