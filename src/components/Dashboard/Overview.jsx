import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
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

  const calculateInterest = () => {
    if (!investor) return 0;
    const amount = Number(investor.amount || 0);
    const rate = investor.interestRate || 0.30;
    const startDate = investor.date?.seconds ? new Date(investor.date.seconds * 1000) : new Date();
    const now = new Date();
    
    // Calculate time elapsed in days for more dynamic growth
    const diffTime = Math.abs(now - startDate);
    const daysElapsed = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Determine total days based on plan
    const planMonths = parseInt(investor.plan) || 12;
    const totalDays = planMonths * 30;
    
    // Simple interest calculation: (days elapsed / total days) * total ROI
    const totalInterest = amount * rate;
    const earnedInterest = (daysElapsed / totalDays) * totalInterest;
    
    // Add a tiny bit of "seed" interest if they just joined so it's not 0
    return Math.max(daysElapsed > 0 ? earnedInterest : amount * 0.001, earnedInterest);
  };

  const getMaturityCountdown = () => {
    if (!investor?.maturityDate?.seconds) return "Calculating...";
    const maturity = new Date(investor.maturityDate.seconds * 1000);
    const now = new Date();
    const diffTime = maturity - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return "Matured 💰";
    
    const months = Math.floor(diffDays / 30);
    const remainingDays = diffDays % 30;
    
    if (months > 0) {
      return `${months}m ${remainingDays}d Left`;
    }
    return `${diffDays} Days Left`;
  };

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
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4 flex items-center gap-4 flex-wrap">
                Good day, <span className="text-orange-600">{investor.name.split(' ')[0]}</span>
              </h1>
              <p className="text-gray-500 font-medium text-lg">Your real estate assets are currently performing at peak capacity.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col relative overflow-hidden group">
                <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                  Invested
                </h2>
                <p className="text-2xl font-black text-gray-900 tracking-tighter mb-1">
                  ₦{Number(investor.amount).toLocaleString()}
                </p>
                <div className="text-green-600 text-[10px] font-bold">
                  Secure Asset
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col relative overflow-hidden group">
                <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                  Interest Earned
                </h2>
                <p className="text-2xl font-black text-orange-600 tracking-tighter mb-1">
                  ₦{calculateInterest().toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
                <div className="text-green-600 text-[10px] font-bold">
                  +{((calculateInterest() / (investor.amount || 1)) * 100).toFixed(2)}% Total Growth
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col relative overflow-hidden group">
                <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                  Maturity
                </h2>
                <p className="text-2xl font-black text-gray-900 tracking-tighter mb-1">
                  {getMaturityCountdown()}
                </p>
                <div className="text-blue-600 text-[10px] font-bold uppercase tracking-widest">
                  Countdown
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col relative overflow-hidden group">
                <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                  Status
                </h2>
                <div className={`text-xl font-black uppercase tracking-tighter mb-1 ${
                  investor.status === 'Active' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {investor.status}
                </div>
                <div className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                  Verified
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
