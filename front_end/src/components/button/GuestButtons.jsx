// components/navbar/GuestButtons.jsx

import { Link } from "react-router-dom";

export default function GuestButtons() {
    return (
        <div className="flex gap-3">

            <Link
                to="/login"
                className="
                    px-4
                    py-2
                    text-slate-300
                    hover:text-white
                    transition
                "
            >
                Login
            </Link>

            <Link
                to="/register-user"
                className="
                    px-5
                    py-2
                    rounded-lg
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    transition
                "
            >
                Register
            </Link>

        </div>
    );
}