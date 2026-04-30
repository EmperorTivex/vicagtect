import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { motion } from "framer-motion";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview"); // 'overview', 'add', 'edit'
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [selectedInvestor, setSelectedInvestor] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
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
    const { name, amount, plan, status, password } = formData;

    if (!name || !amount || !password) {
      showFeedback("Please fill in all required fields", "error");
      return;
    }

    try {
      setLoading(true);
      // 1. Create Investor Profile
      await addDoc(collection(db, "investors"), {
        name,
        amount: Number(amount),
        plan,
        status,
        date: Timestamp.now(),
      });

      // 2. Create Login Account
      await addDoc(collection(db, "logins"), {
        username: name,
        password: password,
      });

      showFeedback("Investor and Login created successfully!", "success");
      setFormData({
        name: "",
        amount: "",
        plan: "18 Months",
        status: "Active",
        password: "",
      });
      fetchInvestors();
      setActiveTab("overview");
    } catch (err) {
      console.error(err);
      showFeedback("Error saving data", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateInvestor = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const investorRef = doc(db, "investors", selectedInvestor.id);
      await updateDoc(investorRef, {
        amount: Number(selectedInvestor.amount),
        plan: selectedInvestor.plan,
        status: selectedInvestor.status,
      });
      showFeedback("Investor updated successfully!", "success");
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
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-white shadow-xl z-10">
        <div className="p-8 border-b border-gray-100">
          <h2 className="text-2xl font-black text-orange-600 tracking-tighter">
            VICAGTECT
          </h2>
          <p className="text-xs font-bold text-gray-400 uppercase mt-1 tracking-widest">
            Admin Dashboard
          </p>
        </div>

        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
              activeTab === "overview"
                ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
                : "text-gray-500 hover:bg-orange-50 hover:text-orange-600"
            }`}
          >
            <span>📋</span> All Investors
          </button>
          <button
            onClick={() => {
              setActiveTab("add");
              setSelectedInvestor(null);
            }}
            className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
              activeTab === "add"
                ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
                : "text-gray-500 hover:bg-orange-50 hover:text-orange-600"
            }`}
          >
            <span>➕</span> Register New
          </button>
        </nav>

        <div className="mt-auto p-6">
          <button
            onClick={handleLogout}
            className="w-full bg-red-50 text-red-600 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
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
              <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div>
                  <h1 className="text-4xl font-black text-gray-800 tracking-tight">
                    Management
                  </h1>
                  <p className="text-gray-500 font-medium">
                    Overview of all registered real estate investors.
                  </p>
                </div>
                <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100">
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
                  <p className="text-gray-400 font-bold">Fetching records...</p>
                </div>
              ) : (
                <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                          <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">
                            Investor
                          </th>
                          <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">
                            Investment
                          </th>
                          <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">
                            Plan
                          </th>
                          <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">
                            Status
                          </th>
                          <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">
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
                            <td className="px-8 py-6">
                              <div className="font-bold text-gray-800 text-lg">
                                {inv.name}
                              </div>
                              <div className="text-xs text-gray-400 font-medium">
                                Joined{" "}
                                {inv.date?.seconds
                                  ? new Date(
                                      inv.date.seconds * 1000,
                                    ).toLocaleDateString()
                                  : "N/A"}
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <div className="text-xl font-black text-gray-900 tracking-tighter">
                                ₦{Number(inv.amount).toLocaleString()}
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-tight">
                                {inv.plan}
                              </span>
                            </td>
                            <td className="px-8 py-6">
                              <span
                                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                  inv.status === "Active"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {inv.status}
                              </span>
                            </td>
                            <td className="px-8 py-6 text-right">
                              <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => {
                                    setSelectedInvestor(inv);
                                    setActiveTab("edit");
                                  }}
                                  className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                                  title="Edit"
                                >
                                  ✏️
                                </button>
                                <button
                                  onClick={() => handleDelete(inv.id, inv.name)}
                                  className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
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
              <header className="text-center mb-12">
                <div className="inline-block p-4 bg-orange-100 rounded-3xl mb-4 text-3xl">
                  {activeTab === "add" ? "👤" : "📝"}
                </div>
                <h1 className="text-4xl font-black text-gray-800 tracking-tight">
                  {activeTab === "add" ? "Register Investor" : "Edit Record"}
                </h1>
                <p className="text-gray-500 font-medium">
                  {activeTab === "add"
                    ? "Creates both the financial profile and system login credentials."
                    : `Updating records for ${selectedInvestor?.name}`}
                </p>
              </header>

              <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-8 md:p-12 border border-gray-100">
                <form
                  onSubmit={
                    activeTab === "add"
                      ? handleAddInvestor
                      : handleUpdateInvestor
                  }
                  className="space-y-8"
                >
                  {activeTab === "add" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                          Full Name (Login Username)
                        </label>
                        <input
                          type="text"
                          className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none font-bold text-gray-700 transition-all"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                          Account Password
                        </label>
                        <input
                          type="text"
                          className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none font-bold text-gray-700 transition-all"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                      Investment Amount (₦)
                    </label>
                    <input
                      type="number"
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none font-black text-2xl text-gray-800 transition-all"
                      value={
                        activeTab === "add"
                          ? formData.amount
                          : selectedInvestor?.amount
                      }
                      onChange={(e) =>
                        activeTab === "add"
                          ? setFormData({ ...formData, amount: e.target.value })
                          : setSelectedInvestor({
                              ...selectedInvestor,
                              amount: e.target.value,
                            })
                      }
                      placeholder="50,000"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                        Investment Plan
                      </label>
                      <select
                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 font-bold text-gray-700 transition-all appearance-none"
                        value={
                          activeTab === "add"
                            ? formData.plan
                            : selectedInvestor?.plan
                        }
                        onChange={(e) =>
                          activeTab === "add"
                            ? setFormData({ ...formData, plan: e.target.value })
                            : setSelectedInvestor({
                                ...selectedInvestor,
                                plan: e.target.value,
                              })
                        }
                      >
                        <option>18 Months</option>
                        <option>36 Months</option>
                        <option>60 Months</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                        Current Status
                      </label>
                      <select
                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 font-bold text-gray-700 transition-all appearance-none"
                        value={
                          activeTab === "add"
                            ? formData.status
                            : selectedInvestor?.status
                        }
                        onChange={(e) =>
                          activeTab === "add"
                            ? setFormData({
                                ...formData,
                                status: e.target.value,
                              })
                            : setSelectedInvestor({
                                ...selectedInvestor,
                                status: e.target.value,
                              })
                        }
                      >
                        <option>Active</option>
                        <option>Pending</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-orange-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-orange-700 shadow-xl shadow-orange-200 transition-all disabled:opacity-50"
                    >
                      {loading
                        ? "Processing..."
                        : activeTab === "add"
                          ? "Create Account"
                          : "Update Profile"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("overview");
                        setSelectedInvestor(null);
                      }}
                      className="px-10 py-5 bg-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.section>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
