import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // User greeting (customize as needed)
  const userGreeting = isLoggedIn ? (
    <span className="text-sm text-white mr-4">Welcome!</span>
  ) : null;

  // Navigation links
  const navLinks = (
    <>
      <Link
        to="/dashboard"
        className={`px-3 py-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          location.pathname === "/dashboard"
            ? "bg-blue-700 text-white"
            : "text-blue-300 hover:bg-blue-600 hover:text-white"
        }`}
        aria-current={location.pathname === "/dashboard" ? "page" : undefined}
        onClick={() => setMenuOpen(false)}
      >
        Dashboard
      </Link>
      {!isLoggedIn && (
        <>
          <Link
            to="/login"
            className={`px-3 py-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              location.pathname === "/login"
                ? "bg-blue-700 text-white"
                : "text-blue-300 hover:bg-blue-600 hover:text-white"
            }`}
            aria-current={location.pathname === "/login" ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`px-3 py-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 ${
              location.pathname === "/register"
                ? "bg-green-700 text-white"
                : "text-green-300 hover:bg-green-600 hover:text-white"
            }`}
            aria-current={location.pathname === "/register" ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            Register
          </Link>
        </>
      )}
      {isLoggedIn && <LogoutButton />}
    </>
  );

  return (
    <nav
      className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 shadow-lg py-4"
      aria-label="Main navigation"
      role="navigation"
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link
          to="/dashboard"
          className="font-bold text-2xl tracking-tight text-white hover:text-blue-300 transition-colors"
        >
          📝 Simple ToDo
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          {userGreeting}
          {navLinks}
        </div>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex items-center px-3 py-2 border rounded text-white border-blue-400 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg
            className="fill-current h-5 w-5"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" />
          </svg>
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-2 mt-2">
          {userGreeting}
          {navLinks}
        </div>
      )}
    </nav>
  );
}