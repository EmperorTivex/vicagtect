import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src={Logo} alt="Vicagtect Logo " className="h-10 w-auto" />
        <h1 className="text-xl font-bold text-orange-600"> Vicagtect</h1>
      </div>
      <button
        className="sm:hidden text-orange-600 focus:outline-none"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <svg
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
      <ul
        className={`flex-col sm:flex-row flex gap-4 sm:gap-6 w-full sm:w-auto ${
          open ? "flex" : "hidden"
        } sm:flex mt-4 sm:mt-o`}
      >
        <li>
          {" "}
          <a href="/" className="hover:text-blue-500 block py-2 sm:py-0">
            Home
          </a>
        </li>
        <li>
          {" "}
          <Link
            to="/about"
            className="hover:text-orange-500 block py-2 sm:py-0"
          >
            {" "}
            About
          </Link>
        </li>
        <li>
          {" "}
          <a
            href="/listings"
            className="hover:text-orange-500 block py-2 sm:py-0"
          >
            {" "}
            Listings
          </a>
        </li>
        <li>
          {" "}
          <Link
            to="/draw-build"
            className="hover:text-orange-500 block py-2 sm:py-0"
          >
            {" "}
            Design & Build
          </Link>
        </li>
        <li>
          {" "}
          <Link
            to="/contact"
            className="hover:text-orange-500 block py-2 sm:py-0"
          >
            {" "}
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
