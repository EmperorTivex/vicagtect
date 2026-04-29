import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition">
          <img src={Logo} alt="Vicagtect Logo" className="h-10 w-auto" />
          <h1 className="text-2xl font-extrabold text-orange-600 tracking-tight">Vicagtect</h1>
        </Link>
        <button
          className="sm:hidden text-orange-600 p-2 hover:bg-orange-50 rounded-lg transition"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
        <ul className={`${
          open ? "flex flex-col absolute top-[72px] left-0 w-full bg-white shadow-xl p-6 border-t border-orange-50" : "hidden"
        } sm:flex sm:flex-row sm:static sm:w-auto sm:bg-transparent sm:shadow-none sm:p-0 gap-6 lg:gap-8 items-center`}>
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Realties", path: "/realties" },
            { name: "Listings", path: "/listings" },
            { name: "Design & Build", path: "/draw-build" },
            { name: "Contact", path: "/contact" }
          ].map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className="text-gray-700 hover:text-orange-600 font-semibold text-sm uppercase tracking-wider transition-colors block py-2 sm:py-0"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
