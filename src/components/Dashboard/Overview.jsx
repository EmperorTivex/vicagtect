import React, { use } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, where, query } from "firebase/firestore";

function Overview() {
  // const investorData = {
  //   name: "Victor-kukoyi Oluwatise",
  //   totalInvested: "₦2,000,000",
  //   status: "Active",
  //   lastUpdated: "July 30,2025",
  // };
  const [investor, setInvestor] = useState(null);
  const [loading, setLoading] = useState(true);
  const name = localStorage.getItem("investorName");

  useEffect(() => {
    const fetchInvestor = async () => {
      try {
        const q = query(collection(db, "investors"), where("name", "==", name));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setInvestor(querySnapshot.docs[0].data());
        } else {
          setInvestor(null);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching investor data:", err);
        setLoading(false);
      }
    };
    fetchInvestor();
  }, [name]);
  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;

  if (!investor) {
    return (
      <div className="text-center mt-10 text-red-500">
        No investor data found for <strong>{name}</strong>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 sm:p-6">
        <Topbar />
        <main className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left">
            Welcome, {investor.name}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gray-200 p-4 sm:p-6rounded shadow-md ">
              <h2 className="text-base sm:text-lg font-bold mb-2">
                Total Amount Invested
              </h2>
              <p className="text-xl sm:text-2xl font-bold text-gray-800">
                {investor.amount}
              </p>
            </div>
            <div className="bg-gray-200 p-4 sm:p-6 rounded-lg shadow-md">
              <h2 className="text-base sm:text-lg font-bold mb-2">
                Investment Status
              </h2>
              <p className="text-base sm:text-lg text-blue-700 font-medium">
                {investor.status}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                {" "}
                Last updated:
                {new Date(investor.date.seconds * 1000).toDateString()}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Overview;
