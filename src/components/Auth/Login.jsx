import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import Logo from "../../assets/Logo.png";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Authenticate with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Fetch investor details from Firestore to get their name
      const q = query(
        collection(db, "investors"),
        where("uid", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      
      let investorName = email; // Fallback
      if (!querySnapshot.empty) {
        investorName = querySnapshot.docs[0].data().name;
      }
      
      // 3. Set Session
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("investorName", investorName);
      localStorage.setItem("userEmail", email);
      
      if (setIsLoggedIn) setIsLoggedIn(true);
      navigate("/dashboard");

    } catch (err) {
      console.error("Login error:", err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError("The email or password you entered is incorrect.");
      } else {
        setError("We encountered a technical issue. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[440px]"
      >
        {/* Brand Identity */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6">
            <img src={Logo} alt="Vicagtect Logo" className="h-16 w-auto mx-auto" />
          </Link>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
            Investor Portal
          </h1>
          <p className="text-gray-500 font-medium">
            Secure access to your real estate investments.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-8 md:p-12 border border-gray-100">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none font-bold text-gray-700 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Password
                </label>
                <Link to="/forgot-password" size="sm" className="text-xs font-bold text-orange-600 hover:text-orange-700">
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none font-bold text-gray-700 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 border-l-4 border-red-500 p-4 rounded-xl"
                >
                  <p className="text-red-700 text-sm font-bold flex items-center gap-2">
                    <span>⚠️</span> {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-orange-700 shadow-xl shadow-orange-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <span className={loading ? "opacity-0" : "opacity-100"}>Sign In</span>
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-gray-400 font-bold text-sm">
              New to Vicagtect?{" "}
              <Link to="/contact" className="text-orange-600 hover:text-orange-700">
                Contact us to invest
              </Link>
            </p>
          </div>
        </div>

        {/* Support Links */}
        <div className="mt-8 flex justify-center gap-6">
          <Link to="/about" className="text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-widest transition-colors">
            About Us
          </Link>
          <Link to="/contact" className="text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-widest transition-colors">
            Support
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
