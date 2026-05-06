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
        <main className="p-6 md:p-12 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <header className="mb-12">
              <span className="text-xs font-black text-orange-600 uppercase tracking-[0.3em] mb-3 inline-block">
                Market Overview
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
                Good day, <span className="text-orange-600">{investor.name.split(' ')[0]}</span>
              </h1>
              <p className="text-gray-500 font-medium text-lg">Your real estate assets are currently performing at peak capacity.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col relative overflow-hidden group">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
                <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                  Portfolio Value
                </h2>
                <p className="text-4xl font-black text-gray-900 tracking-tighter mb-2">
                  ₦{Number(investor.amount).toLocaleString()}
                </p>
                <div className="text-green-600 text-xs font-bold flex items-center gap-1">
                  <span>📈</span> +0.0% this month
                </div>
              </div>

              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col relative overflow-hidden group">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
                <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                  Growth Strategy
                </h2>
                <p className="text-3xl font-black text-gray-900 tracking-tight mb-2">
                  {investor.plan || "Standard"}
                </p>
                <div className="text-blue-600 text-xs font-bold uppercase tracking-widest">
                  Active Subscription
                </div>
              </div>

              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col relative overflow-hidden group">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-50 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
                <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                  Account Status
                </h2>
                <div className={`text-2xl font-black uppercase tracking-tighter mb-2 ${
                  investor.status === 'Active' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {investor.status}
                </div>
                <div className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                  Verified Investor
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-[3rem] p-12 text-white shadow-2xl shadow-orange-200/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-6 tracking-tight">Investment Summary</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">📅</div>
                    <div>
                      <p className="text-xs font-black text-orange-200 uppercase tracking-widest mb-1">Commencement Date</p>
                      <p className="text-xl font-bold">
                        {investor.date?.seconds 
                          ? new Date(investor.date.seconds * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">🏛️</div>
                    <div>
                      <p className="text-xs font-black text-orange-200 uppercase tracking-widest mb-1">Asset Security</p>
                      <p className="text-xl font-bold">100% Backed by Real Estate</p>
                    </div>
                  </div>
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
