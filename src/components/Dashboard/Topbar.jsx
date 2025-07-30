import React from "react";

function Topbar() {
  return (
    <div className="w-full bg-orange-600 text-white p-4 flex justify-between items-center">
      <h3 className="text-lg font-semibold">Investor Dashboard</h3>
      <button className="bg-white text-orange-600 px-3 py-1 rounded hover:bg-gray-200">
        Logout
      </button>
    </div>
  );
}

export default Topbar;
