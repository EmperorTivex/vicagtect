import React, { use } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, where, query } from "firebase/firestore";

function Overview() {
  const [investor, setInvestor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const name = localStorage.getItem("investorName");

  useEffect(() => {
    const fetchInvestor = async () => {
      setLoading(true);
      setError(null);
      try {
        const q = query(collection(db, "investors"), where("name", "==", name));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setInvestor(querySnapshot.docs[0].data());
        } else {
          setInvestor(null);
        }
      } catch (err) {
        console.error("Error fetching investor data:", err);
        setError("Failed to fetch your data. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };
    if (name) {
      fetchInvestor();
    } else {
      setLoading(false);
    }
  }, [name]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-orange-100 border-t-orange-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-bold">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !investor) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error ? "Connection Error" : "Profile Not Found"}
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {error || `We couldn't find an investor profile for "${name}". Please contact support if you think this is a mistake.`}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-700 transition"
          >
            Retry Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-4 sm:p-8 md:p-12 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <header className="mb-10">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
                Welcome back, <span className="text-orange-600">{investor.name}</span>
              </h1>
              <p className="text-gray-500 font-medium">Here's a summary of your investments at Vicagtect.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 text-xl mb-4">💰</div>
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Total Invested
                </h2>
                <p className="text-3xl font-extrabold text-gray-800">
                  ₦{Number(investor.amount).toLocaleString()}
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 text-xl mb-4">📈</div>
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Active Plan
                </h2>
                <p className="text-3xl font-extrabold text-gray-800">
                  {investor.plan || "N/A"}
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 text-xl mb-4">✅</div>
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Status
                </h2>
                <p className={`text-3xl font-extrabold ${
                  investor.status === 'Active' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {investor.status}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Investment Timeline</h3>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="p-3 bg-gray-50 rounded-xl">📅</div>
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Date Joined</p>
                  <p className="text-lg font-semibold">
                    {investor.date?.seconds 
                      ? new Date(investor.date.seconds * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Overview;
