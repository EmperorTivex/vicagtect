import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function Overview() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div>
        <Topbar />
        <main className="p-6">
          <h1 className="text-2xl">Welcome, Investor</h1>
          <p>
            This is where we'll display your investment overview and metrics.
          </p>
        </main>
      </div>
    </div>
  );
}

export default Overview;
