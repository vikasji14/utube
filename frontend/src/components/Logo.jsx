import React from "react";
import { Link } from "react-router-dom";
import logoIcon from "../../public/streamX.svg";

function Logo() {
    return (
        <>
            <Link to={'/'} className="flex gap-2 items-center">
                <img src={logoIcon} alt="logo" className="w-10  h-10 bg-purple-500 rounded-xl hover:bg-slate-200" />
                <span className="font-bold text-white text-2xl">streamX</span>
            </Link>
        </>
    );
}

export default Logo;
