import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function Overview() {
  const investorData = {
    name: "Victor-kukoyi Oluwatise",
    totalInvested: "₦2,000,000",
    status: "Active",
    lastUpdated: "July 30,2025",
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Topbar />
        <main className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">
            Welcome, {investorData.name}
          </h1>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-200 p-6 rounded shadow-md ">
              <h2 className="text-lg font-bold mb-2">Total Amount Invested</h2>
              <p className="text-2xl font-bold text-grayn-800">
                {investorData.totalInvested}
              </p>
            </div>
            <div className="bg-gray-200 rounded-lg shadow-md">
              <h2 className="text-lg font-bold  mb-2">Investment Status</h2>
              <p className="text-lg text-blue-700 font-medium">
                {investorData.status}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {" "}
                Last updated:{investorData.lastUpdated}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Overview;
