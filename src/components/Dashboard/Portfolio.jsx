import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { db } from "../../firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

function Portfolio() {
  const [investor, setInvestor] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const name = localStorage.getItem("investorName");

  const [selectedTx, setSelectedTx] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      setLoading(true);
      try {
        // 1. Fetch Investor Profile
        const q = query(collection(db, "investors"), where("name", "==", name));
        const investorSnapshot = await getDocs(q);

        if (!investorSnapshot.empty) {
          const invData = {
            id: investorSnapshot.docs[0].id,
            ...investorSnapshot.docs[0].data(),
          };
          setInvestor(invData);

          // 2. Fetch Transactions for this investor
          const tQ = query(
            collection(db, "transactions"),
            where("investorId", "==", invData.id),
            orderBy("date", "desc"),
          );
          const tSnapshot = await getDocs(tQ);
          const tList = tSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
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
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 relative">
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="p-4 md:p-12 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <header className="mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl font-black text-gray-800 tracking-tight mb-2">
                Investment Portfolio
              </h1>
              <p className="text-gray-500 font-medium">
                Detailed breakdown of your financial assets and growth.
              </p>
            </header>

            {/* Portfolio Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-6 md:p-8 text-4xl md:text-6xl opacity-5 group-hover:opacity-10 transition-opacity">
                  💰
                </div>
                <h3 className="text-[10px] md:text-sm font-black text-gray-400 uppercase tracking-widest mb-4">
                  Total Assets
                </h3>
                <p className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter">
                  ₦{Number(investor?.amount || 0).toLocaleString()}
                </p>
                <div className="mt-4 md:mt-6 flex items-center gap-2 text-green-600 font-bold">
                  <span className="bg-green-100 px-2 py-1 rounded-lg text-[10px]">
                    ↑ Secure
                  </span>
                  <span className="text-xs md:text-sm">Verified Portfolio</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-orange-600 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-orange-200 border border-orange-500 relative overflow-hidden text-white group"
              >
                <div className="absolute top-0 right-0 p-6 md:p-8 text-4xl md:text-6xl opacity-20 group-hover:opacity-30 transition-opacity">
                  📈
                </div>
                <h3 className="text-[10px] md:text-sm font-black text-orange-200 uppercase tracking-widest mb-4">
                  Current Plan
                </h3>
                <p className="text-2xl md:text-4xl font-black tracking-tight mb-2">
                  {investor?.plan || "N/A"}
                </p>
                <p className="text-orange-100 text-xs md:text-sm font-medium opacity-80 leading-relaxed">
                  Accumulating high-yield returns daily.
                </p>
              </motion.div>
            </div>

            {/* Transaction History */}
            <section>
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-black text-gray-800 tracking-tight">
                  Transaction History
                </h2>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {transactions.length} Records
                </span>
              </div>

              <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                {transactions.length === 0 ? (
                  <div className="p-12 md:p-20 text-center">
                    <div className="text-4xl md:text-5xl mb-4">📄</div>
                    <p className="text-gray-400 font-bold">
                      No transactions found yet.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto scrollbar-hide">
                    <table className="w-full text-left min-w-[500px]">
                      <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                          <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest">
                            Date & Reference
                          </th>
                          <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest">
                            Type
                          </th>
                          <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest">
                            Amount
                          </th>
                          <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest text-right">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {transactions.map((t) => (
                          <tr
                            key={t.id}
                            className="hover:bg-gray-50/50 transition-colors group"
                          >
                            <td className="px-4 md:px-8 py-4 md:py-6">
                              <div className="font-bold text-gray-800 text-xs md:text-base">
                                {t.date?.seconds
                                  ? new Date(
                                      t.date.seconds * 1000,
                                    ).toLocaleDateString("en-GB", {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    })
                                  : "N/A"}
                              </div>
                              <div className="text-[10px] text-gray-400 font-black tracking-widest mt-1">
                                {t.reference || "REF-000000"}
                              </div>
                            </td>
                            <td className="px-4 md:px-8 py-4 md:py-6">
                              <div className="font-bold text-gray-600 text-[10px] md:text-sm">
                                {t.type}
                              </div>
                              <div className="text-[10px] md:text-xs text-gray-400 truncate max-w-[80px] md:max-w-[150px]">
                                {t.description}
                              </div>
                            </td>
                            <td className="px-4 md:px-8 py-4 md:py-6">
                              <div className="text-sm md:text-lg font-black text-gray-900 tracking-tighter">
                                ₦{Number(t.amount).toLocaleString()}
                              </div>
                            </td>
                            <td className="px-4 md:px-8 py-4 md:py-6 text-right">
                              <button
                                onClick={() => {
                                  setSelectedTx(t);
                                  setShowReceipt(true);
                                }}
                                className="bg-orange-50 text-orange-600 px-2 md:px-4 py-1.5 md:py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all whitespace-nowrap"
                              >
                                {window.innerWidth < 768
                                  ? "View"
                                  : "View Receipt"}
                              </button>
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

      {/* Receipt Modal */}
      <AnimatePresence>
        {showReceipt && selectedTx && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReceipt(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-0 overflow-hidden"
            >
              {/* Receipt Header */}
              <div className="bg-orange-600 p-6 md:p-8 text-white text-center">
                <h2 className="text-lg md:text-xl font-black tracking-widest uppercase mb-1">
                  Transaction Receipt
                </h2>
                <p className="text-orange-100 text-[10px] md:text-xs font-medium">
                  Vicagtect Real Estate Nigeria Limited
                </p>
              </div>

              {/* Receipt Body */}
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Date
                    </p>
                    <p className="text-sm md:text-base font-bold text-gray-800">
                      {selectedTx.date?.seconds
                        ? new Date(
                            selectedTx.date.seconds * 1000,
                          ).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "N/A"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      Reference
                    </p>
                    <p className="text-sm md:text-base font-mono font-bold text-orange-600">
                      {selectedTx.reference}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-500 font-medium">Investor</span>
                    <span className="font-bold text-gray-800">
                      {investor?.name}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-500 font-medium">
                      Transaction Type
                    </span>
                    <span className="font-bold text-gray-800">
                      {selectedTx.type}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span className="text-gray-500 font-medium">
                      Payment Status
                    </span>
                    <span className="text-green-600 font-black uppercase text-[10px] md:text-xs tracking-widest">
                      Verified ✓
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 md:p-6 rounded-2xl text-center">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Amount Paid
                  </p>
                  <p className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter">
                    ₦{Number(selectedTx.amount).toLocaleString()}
                  </p>
                </div>

                <p className="text-[10px] text-gray-400 text-center leading-relaxed px-4">
                  This is a computer-generated receipt for your real estate
                  contribution with Vicagtect. All funds are securely allocated
                  to ongoing property developments.
                </p>

                <button
                  onClick={() => setShowReceipt(false)}
                  className="w-full bg-gray-900 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-gray-800 transition-all"
                >
                  Close Receipt
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Portfolio;
