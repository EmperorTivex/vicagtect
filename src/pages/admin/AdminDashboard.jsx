import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { motion, AnimatePresence } from "framer-motion";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
  query,
  where,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminTopbar from "../../components/Admin/AdminTopbar";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview"); // 'overview', 'add', 'edit'
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [paymentData, setPaymentData] = useState({
    amount: "",
    type: "Top-up",
  });

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    plan: "18 Months",
    status: "Active",
    password: "",
  });

  // Auth Check
  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (isAdminLoggedIn !== "true") {
      navigate("/admin-login");
    }
    fetchInvestors();
  }, [navigate]);

  const fetchInvestors = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "investors"));
      const list = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInvestors(
        list.sort((a, b) => (b.date?.seconds || 0) - (a.date?.seconds || 0)),
      );
    } catch (err) {
      console.error(err);
      showFeedback("Failed to fetch investors", "error");
    } finally {
      setLoading(false);
    }
  };

  const showFeedback = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 4000);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin-login");
  };

  const handleAddInvestor = async (e) => {
    e.preventDefault();
    const { name, email, amount, plan, status, password } = formData;

    // Password validation should be strengthened
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      showFeedback(
        "Password must be at least 8 characters long, include letters and numbers",
        "error",
      );
      return;
    }

    if (!name || !email || !amount || !password) {
      showFeedback("Please fill in all required fields", "error");
      return;
    }

    try {
      setLoading(true);

      // 1. Create Secure Auth Account (The "ATM Card")
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // Calculate Maturity Date (e.g., based on plan)
      const monthsToAdd = plan.includes("18")
        ? 18
        : plan.includes("12")
          ? 12
          : 24;
      const maturityDate = new Date();
      maturityDate.setMonth(maturityDate.getMonth() + monthsToAdd);

      // 2. Create Investor Profile (The "Bank Account")
      const investorDoc = await addDoc(collection(db, "investors"), {
        uid: user.uid,
        name,
        email,
        amount: Number(amount),
        plan,
        status,
        date: Timestamp.now(),
        maturityDate: Timestamp.fromDate(maturityDate),
        interestRate: 0.3, // 30% ROI default
      });

      // 3. Create Initial Transaction (The "Opening Deposit")
      await addDoc(collection(db, "transactions"), {
        investorId: investorDoc.id,
        investorUid: user.uid,
        amount: Number(amount),
        type: "Initial Investment",
        date: Timestamp.now(),
        description: `Account opened with ${plan} plan`,
        reference: `VIC-${Math.floor(100000 + Math.random() * 900000)}`,
      });

      showFeedback(
        "Investor account and first transaction recorded!",
        "success",
      );
      setFormData({
        name: "",
        email: "",
        amount: "",
        plan: "18 Months",
        status: "Active",
        password: "",
      });
      fetchInvestors();
      setActiveTab("overview");
    } catch (err) {
      console.error(err);
      let errorMsg = "Error saving data";
      if (err.code === "auth/email-already-in-use")
        errorMsg = "Email already registered";
      showFeedback(errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddPayment = async (e) => {
    e.preventDefault();
    if (!paymentData.amount || Number(paymentData.amount) <= 0) {
      showFeedback("Please enter a valid amount", "error");
      return;
    }

    try {
      setLoading(true);
      // 1. Record the Transaction
      await addDoc(collection(db, "transactions"), {
        investorId: selectedInvestor.id,
        investorUid: selectedInvestor.uid,
        amount: Number(paymentData.amount),
        type: paymentData.type,
        date: Timestamp.now(),
        description: "Additional contribution added via Admin",
        reference: `VIC-${Math.floor(100000 + Math.random() * 900000)}`,
      });

      // 2. Update the Total Invested in Investor doc
      const investorRef = doc(db, "investors", selectedInvestor.id);
      await updateDoc(investorRef, {
        amount:
          Number(selectedInvestor.amount || 0) + Number(paymentData.amount),
      });

      showFeedback(
        `₦${Number(paymentData.amount).toLocaleString()} added to ${selectedInvestor.name}'s portfolio`,
        "success",
      );
      fetchInvestors();
      setShowPaymentModal(false);
      setPaymentData({ amount: "", type: "Top-up" });
      setSelectedInvestor(null);
    } catch (err) {
      console.error(err);
      showFeedback("Failed to record payment", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateInvestor = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const investorRef = doc(db, "investors", selectedInvestor.id);

      // Calculate new maturity based on the current plan and the original join date
      const monthsToAdd = selectedInvestor.plan?.includes("18")
        ? 18
        : selectedInvestor.plan?.includes("12")
          ? 12
          : 24;

      // Use the original join date if available, otherwise use now
      const baseDate = selectedInvestor.date?.seconds
        ? new Date(selectedInvestor.date.seconds * 1000)
        : new Date();

      const newMaturityDate = new Date(baseDate);
      newMaturityDate.setMonth(newMaturityDate.getMonth() + monthsToAdd);

      let updateData = {
        amount: Number(selectedInvestor.amount),
        plan: selectedInvestor.plan,
        status: selectedInvestor.status,
        maturityDate: Timestamp.fromDate(newMaturityDate),
        interestRate: selectedInvestor.plan?.includes("24")
          ? 0.4
          : selectedInvestor.plan?.includes("18")
            ? 0.3
            : 0.25,
      };

      await updateDoc(investorRef, updateData);
      showFeedback("Investor profile updated successfully!", "success");
      fetchInvestors();
      setActiveTab("overview");
      setSelectedInvestor(null);
    } catch (err) {
      console.error(err);
      showFeedback("Update failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${name}? This will NOT delete their login credentials.`,
      )
    ) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "investors", id));
        showFeedback("Investor deleted", "success");
        fetchInvestors();
      } catch (err) {
        console.error(err);
        showFeedback("Delete failed", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row relative">
      <AdminSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopbar
          onMenuClick={() => setIsMobileMenuOpen(true)}
          onLogout={handleLogout}
        />

        {/* Main Content */}
        <main className="p-4 md:p-12 overflow-y-auto">
          {/* Feedback Message */}
          {message.text && (
            <div
              className={`fixed top-6 right-6 z-50 px-8 py-4 rounded-2xl shadow-2xl font-bold animate-bounce ${
                message.type === "success"
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="max-w-6xl mx-auto">
            {activeTab === "overview" && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-10">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-800 tracking-tight">
                      Management
                    </h1>
                    <p className="text-gray-500 font-medium text-sm md:text-base">
                      Overview of all registered real estate investors.
                    </p>
                  </div>
                  <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 w-fit">
                    <span className="text-gray-400 font-bold uppercase text-xs tracking-widest mr-2">
                      Count
                    </span>
                    <span className="text-2xl font-black text-orange-600">
                      {investors.length}
                    </span>
                  </div>
                </header>

                {loading && investors.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                    <div className="w-12 h-12 border-4 border-orange-100 border-t-orange-600 rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-400 font-bold">
                      Fetching records...
                    </p>
                  </div>
                ) : (
                  <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                          <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest">
                              Investor
                            </th>
                            <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest">
                              Investment
                            </th>
                            <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest">
                              Plan
                            </th>
                            <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest">
                              Status
                            </th>
                            <th className="px-4 md:px-8 py-4 md:py-6 text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest text-right">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {investors.map((inv) => (
                            <tr
                              key={inv.id}
                              className="hover:bg-orange-50/30 transition-colors group"
                            >
                              <td className="px-4 md:px-8 py-4 md:py-6">
                                <div className="font-bold text-gray-800 text-xs md:text-lg">
                                  {inv.name}
                                </div>
                                <div className="text-[10px] md:text-xs text-gray-400 font-medium">
                                  Joined{" "}
                                  {inv.date?.seconds
                                    ? new Date(
                                        inv.date.seconds * 1000,
                                      ).toLocaleDateString()
                                    : "N/A"}
                                </div>
                              </td>
                              <td className="px-4 md:px-8 py-4 md:py-6">
                                <div className="text-base md:text-xl font-black text-gray-900 tracking-tighter">
                                  ₦{Number(inv.amount).toLocaleString()}
                                </div>
                              </td>
                              <td className="px-4 md:px-8 py-4 md:py-6">
                                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-[10px] md:text-xs font-black uppercase tracking-tight">
                                  {inv.plan}
                                </span>
                              </td>
                              <td className="px-4 md:px-8 py-4 md:py-6">
                                <span
                                  className={`px-2 md:px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                    inv.status === "Active"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-yellow-100 text-yellow-700"
                                  }`}
                                >
                                  {inv.status}
                                </span>
                              </td>
                              <td className="px-4 md:px-8 py-4 md:py-6 text-right">
                                <div className="flex justify-end gap-1 md:gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={() => {
                                      setSelectedInvestor(inv);
                                      setShowPaymentModal(true);
                                    }}
                                    className="p-1.5 md:p-2 bg-green-50 text-green-600 rounded-lg md:rounded-xl hover:bg-green-600 hover:text-white transition-all"
                                    title="Add Payment"
                                  >
                                    💰
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedInvestor(inv);
                                      setActiveTab("edit");
                                    }}
                                    className="p-1.5 md:p-2 bg-blue-50 text-blue-600 rounded-lg md:rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                                    title="Edit"
                                  >
                                    ✏️
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDelete(inv.id, inv.name)
                                    }
                                    className="p-1.5 md:p-2 bg-red-50 text-red-600 rounded-lg md:rounded-xl hover:bg-red-600 hover:text-white transition-all"
                                    title="Delete"
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </motion.section>
            )}

            {(activeTab === "add" || activeTab === "edit") && (
              <motion.section
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto"
              >
                <header className="text-center mb-8 md:mb-12">
                  <div className="inline-block p-4 bg-orange-100 rounded-3xl mb-4 text-2xl md:text-3xl">
                    {activeTab === "add" ? "👤" : "📝"}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-black text-gray-800 tracking-tight">
                    {activeTab === "add" ? "Register Investor" : "Edit Record"}
                  </h1>
                  <p className="text-gray-500 font-medium text-sm md:text-base">
                    {activeTab === "add"
                      ? "Creates both the financial profile and system login credentials."
                      : `Updating records for ${selectedInvestor?.name}`}
                  </p>
                </header>

                <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-6 md:p-12 border border-gray-100">
                  <form
                    onSubmit={
                      activeTab === "add"
                        ? handleAddInvestor
                        : handleUpdateInvestor
                    }
                    className="space-y-6 md:space-y-8"
                  >
                    {activeTab === "add" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <div>
                          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-800 focus:ring-2 focus:ring-orange-500 transition-all"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                            Email Address
                          </label>
                          <input
                            type="email"
                            required
                            className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-800 focus:ring-2 focus:ring-orange-500 transition-all"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                          Investment Amount (₦)
                        </label>
                        <input
                          type="number"
                          required
                          className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-800 focus:ring-2 focus:ring-orange-500 transition-all"
                          placeholder="500000"
                          value={
                            activeTab === "add"
                              ? formData.amount
                              : selectedInvestor?.amount
                          }
                          onChange={(e) =>
                            activeTab === "add"
                              ? setFormData({
                                  ...formData,
                                  amount: e.target.value,
                                })
                              : setSelectedInvestor({
                                  ...selectedInvestor,
                                  amount: e.target.value,
                                })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                          Investment Plan
                        </label>
                        <select
                          className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-800 focus:ring-2 focus:ring-orange-500 transition-all appearance-none"
                          value={
                            activeTab === "add"
                              ? formData.plan
                              : selectedInvestor?.plan
                          }
                          onChange={(e) =>
                            activeTab === "add"
                              ? setFormData({
                                  ...formData,
                                  plan: e.target.value,
                                })
                              : setSelectedInvestor({
                                  ...selectedInvestor,
                                  plan: e.target.value,
                                })
                          }
                        >
                          <option>12 Months</option>
                          <option>18 Months</option>
                          <option>24 Months</option>
                        </select>
                      </div>
                    </div>

                    {activeTab === "add" && (
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                          System Password
                        </label>
                        <input
                          type="password"
                          required
                          className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-800 focus:ring-2 focus:ring-orange-500 transition-all"
                          placeholder="Min. 8 characters (letters & numbers)"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                        />
                      </div>
                    )}

                    <div className="pt-4 md:pt-6">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-600 text-white py-4 md:py-5 rounded-2xl font-black text-sm md:text-base uppercase tracking-widest hover:bg-orange-700 transition-all shadow-xl shadow-orange-200 disabled:opacity-50"
                      >
                        {loading
                          ? "Processing..."
                          : activeTab === "add"
                            ? "Complete Registration"
                            : "Update Profile"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab("overview");
                          setSelectedInvestor(null);
                        }}
                        className="w-full mt-4 text-gray-400 font-bold text-xs uppercase tracking-widest hover:text-gray-600 transition-colors"
                      >
                        Cancel and Return
                      </button>
                    </div>
                  </form>
                </div>
              </motion.section>
            )}
          </div>
        </main>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && selectedInvestor && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPaymentModal(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-8 border border-gray-100"
            >
              <h2 className="text-2xl font-black text-gray-800 tracking-tight mb-2">
                Record Payment
              </h2>
              <p className="text-gray-500 font-medium mb-8">
                Adding funds to <b>{selectedInvestor.name}</b>'s portfolio.
              </p>

              <form onSubmit={handleAddPayment} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                    Amount (₦)
                  </label>
                  <input
                    type="number"
                    required
                    autoFocus
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-800 focus:ring-2 focus:ring-orange-500 transition-all"
                    placeholder="100000"
                    value={paymentData.amount}
                    onChange={(e) =>
                      setPaymentData({ ...paymentData, amount: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                    Transaction Type
                  </label>
                  <select
                    className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 font-bold text-gray-800 focus:ring-2 focus:ring-orange-500 transition-all appearance-none"
                    value={paymentData.type}
                    onChange={(e) =>
                      setPaymentData({ ...paymentData, type: e.target.value })
                    }
                  >
                    <option>Top-up</option>
                    <option>Monthly Bonus</option>
                    <option>Referral Commission</option>
                    <option>Manual Adjustment</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-green-700 transition-all shadow-xl shadow-green-100 disabled:opacity-50"
                  >
                    {loading ? "Recording..." : "Confirm Payment"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPaymentModal(false)}
                    className="w-full mt-4 text-gray-400 font-bold text-xs uppercase tracking-widest hover:text-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdminDashboard;
