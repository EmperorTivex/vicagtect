import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { db } from "../../firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { motion } from "framer-motion";

function Portfolio() {
  const [investor, setInvestor] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const name = localStorage.getItem("investorName");

  useEffect(() => {
    const fetchPortfolioData = async () => {
      setLoading(true);
      try {
        // 1. Fetch Investor Profile
        const q = query(collection(db, "investors"), where("name", "==", name));
        const investorSnapshot = await getDocs(q);
        
        if (!investorSnapshot.empty) {
          const invData = { id: investorSnapshot.docs[0].id, ...investorSnapshot.docs[0].data() };
          setInvestor(invData);

          // 2. Fetch Transactions for this investor
          const tQ = query(
            collection(db, "transactions"), 
            where("investorId", "==", invData.id),
            orderBy("date", "desc")
          );
          const tSnapshot = await getDocs(tQ);
          const tList = tSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setTransactions(tList);
        }
      } catch (err) {
        console.error("Portfolio fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (name) fetchPortfolioData();
  }, [name]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-orange-100 border-t-orange-600 rounded-full animate-spin"></div>
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
              <h1 className="text-4xl font-black text-gray-800 tracking-tight mb-2">
                Investment Portfolio
              </h1>
              <p className="text-gray-500 font-medium">Detailed breakdown of your financial assets and growth.</p>
            </header>

            {/* Portfolio Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-8 text-6xl opacity-5 group-hover:opacity-10 transition-opacity">💰</div>
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Total Assets</h3>
                <p className="text-5xl font-black text-gray-900 tracking-tighter">
                  ₦{Number(investor?.amount || 0).toLocaleString()}
                </p>
                <div className="mt-6 flex items-center gap-2 text-green-600 font-bold">
                  <span className="bg-green-100 px-2 py-1 rounded-lg text-xs">↑ Secure</span>
                  <span className="text-sm">Verified Portfolio</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-orange-600 p-10 rounded-[2.5rem] shadow-xl shadow-orange-200 border border-orange-500 relative overflow-hidden text-white group"
              >
                <div className="absolute top-0 right-0 p-8 text-6xl opacity-20 group-hover:opacity-30 transition-opacity">📈</div>
                <h3 className="text-sm font-black text-orange-200 uppercase tracking-widest mb-4">Current Plan</h3>
                <p className="text-4xl font-black tracking-tight mb-2">{investor?.plan || "N/A"}</p>
                <p className="text-orange-100 font-medium opacity-80">Accumulating high-yield returns daily.</p>
              </motion.div>
            </div>

            {/* Transaction History */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-gray-800 tracking-tight">Transaction History</h2>
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  {transactions.length} Records
                </span>
              </div>

              <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                {transactions.length === 0 ? (
                  <div className="p-20 text-center">
                    <div className="text-5xl mb-4">📄</div>
                    <p className="text-gray-400 font-bold">No transactions found yet.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                          <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Date & Reference</th>
                          <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Type</th>
                          <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Amount</th>
                          <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {transactions.map((t) => (
                          <tr key={t.id} className="hover:bg-gray-50/50 transition-colors group">
                            <td className="px-8 py-6">
                              <div className="font-bold text-gray-800">
                                {t.date?.seconds 
                                  ? new Date(t.date.seconds * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                                  : "N/A"}
                              </div>
                              <div className="text-[10px] text-gray-400 font-black tracking-widest mt-1">
                                {t.reference || "REF-000000"}
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <div className="font-bold text-gray-600 text-sm">{t.type}</div>
                              <div className="text-xs text-gray-400 truncate max-w-[150px]">{t.description}</div>
                            </td>
                            <td className="px-8 py-6">
                              <div className="text-lg font-black text-gray-900 tracking-tighter">
                                ₦{Number(t.amount).toLocaleString()}
                              </div>
                            </td>
                            <td className="px-8 py-6 text-right">
                              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                Completed
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Portfolio;
