import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function AdminSidebar({ isOpen, onClose, activeTab, setActiveTab, onLogout }) {
  const menuItems = [
    { id: "overview", name: "All Investors", icon: "📋" },
    { id: "add", name: "Register New", icon: "➕" },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white">
      <div className="p-8 border-b border-gray-100 mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-orange-600 tracking-tighter">
            VICAGTECT
          </h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">
            Admin Panel
          </p>
        </div>
        <button
          onClick={onClose}
          className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400"
        >
          ✕
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (onClose) onClose();
              }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                isActive
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
                  : "text-gray-500 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="tracking-tight">{item.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-6">
        <button
          onClick={onLogout}
          className="w-full bg-red-50 text-red-600 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm"
        >
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-gray-100 shadow-sm min-h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[50] md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] bg-white z-[60] md:hidden shadow-2xl"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default AdminSidebar;
