import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

function Topbar() {
  const navigate = useNavigate();
  const name = localStorage.getItem("investorName");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("investorName");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 px-8 py-6 flex justify-between items-center sticky top-0 z-40 backdrop-blur-md bg-white/80">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 font-black">
          {name ? name.charAt(0).toUpperCase() : "U"}
        </div>
        <h3 className="text-gray-800 font-bold hidden sm:block">
          Welcome, <span className="text-orange-600">{name || "Investor"}</span>
        </h3>
      </div>
      
      <div className="flex items-center gap-6">
        <button className="text-gray-400 hover:text-orange-600 transition-colors relative">
          <span className="text-xl">🔔</span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-50 text-red-600 px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}

export default Topbar;
