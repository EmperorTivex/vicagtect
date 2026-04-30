import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Logo from "../../assets/Logo.png";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const q = query(
        collection(db, "admins"),
        where("username", "==", username),
        where("password", "==", password)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        localStorage.setItem("isAdminLoggedIn", "true");
        navigate("/admin-panel");
      } else {
        setError("Invalid administrative credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Authorization server error. Please contact the systems administrator.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[440px]"
      >
        {/* Admin Brand Identity */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6">
            <img src={Logo} alt="Vicagtect Logo" className="h-16 w-auto mx-auto brightness-0 invert" />
          </Link>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2 uppercase">
            Systems Admin
          </h1>
          <p className="text-gray-400 font-medium tracking-widest text-xs uppercase">
            Secure Infrastructure Access
          </p>
        </div>

        {/* Admin Login Card */}
        <div className="bg-gray-800 rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-gray-700">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                Admin Username
              </label>
              <input
                type="text"
                required
                className="w-full px-6 py-4 bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-orange-600 outline-none font-bold text-gray-200 transition-all placeholder-gray-600"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Access ID"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                Security Key
              </label>
              <input
                type="password"
                required
                className="w-full px-6 py-4 bg-gray-900 border-none rounded-2xl focus:ring-2 focus:ring-orange-600 outline-none font-bold text-gray-200 transition-all placeholder-gray-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-900/30 border border-red-500/50 p-4 rounded-xl"
                >
                  <p className="text-red-400 text-xs font-black uppercase tracking-widest text-center">
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-orange-700 shadow-xl shadow-orange-900/20 transition-all disabled:opacity-50 relative overflow-hidden group uppercase tracking-widest"
            >
              <span className={loading ? "opacity-0" : "opacity-100"}>Authenticate</span>
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
            </button>
          </form>
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center">
          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em]">
            Authorized Personnel Only • IP Logged
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default AdminLogin;
