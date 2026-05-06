import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Overview", path: "/dashboard", icon: "📊" },
    { name: "Portfolio", path: "/dashboard/portfolio", icon: "💼" },
    { name: "Support", path: "/contact", icon: "🎧" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-72 bg-white border-r border-gray-100 shadow-sm min-h-screen">
      <div className="p-8 border-b border-gray-50 mb-6">
        <h2 className="text-2xl font-black text-orange-600 tracking-tighter">
          VICAGTECT
        </h2>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">
          Investor Portal
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                isActive
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
                  : "text-gray-500 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6">
        <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Need Help?</p>
          <p className="text-xs text-gray-500 leading-relaxed mb-4">Our financial consultants are available 24/7.</p>
          <Link to="/contact" className="text-xs font-black text-orange-600 uppercase hover:underline">Contact Support →</Link>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
