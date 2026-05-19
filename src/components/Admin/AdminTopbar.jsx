import React from "react";

function AdminTopbar({ onMenuClick, onLogout }) {
  return (
    <header className="w-full bg-white border-b border-gray-100 px-4 md:px-8 py-4 md:py-6 flex justify-between items-center sticky top-0 z-40 backdrop-blur-md bg-white/80">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button
          onClick={onMenuClick}
          className="p-2 md:hidden hover:bg-gray-100 rounded-xl transition-colors"
        >
          <span className="text-2xl">☰</span>
        </button>

        <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 font-black text-sm md:text-base">
          A
        </div>
        <h3 className="text-gray-800 font-bold text-sm md:text-base hidden sm:block">
          Admin <span className="text-orange-600">Control Panel</span>
        </h3>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <button
          onClick={onLogout}
          className="bg-red-50 text-red-600 px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all whitespace-nowrap"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}

export default AdminTopbar;
