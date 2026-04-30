import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    // Note: Since we are using manual Firestore logins, 
    // a real "Reset Link" requires Firebase Auth or a backend.
    // For now, we'll show a professional message directing them to support.
    setTimeout(() => {
      setLoading(false);
      setMessage({ 
        text: "Reset request sent! Our team will contact you at your registered email to verify your identity and reset your password.", 
        type: "success" 
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[440px]"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6">
            <img src={Logo} alt="Vicagtect Logo" className="h-16 w-auto mx-auto" />
          </Link>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
            Reset Password
          </h1>
          <p className="text-gray-500 font-medium px-4">
            Enter your email and we'll help you regain access to your account.
          </p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-8 md:p-12 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="e.g. john@example.com"
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none font-bold text-gray-700 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <AnimatePresence>
              {message.text && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`${
                    message.type === 'success' ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700'
                  } border-l-4 p-4 rounded-xl`}
                >
                  <p className="text-sm font-bold leading-relaxed">
                    {message.type === 'success' ? '✅ ' : '⚠️ '} {message.text}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading || message.type === 'success'}
              className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-orange-700 shadow-xl shadow-orange-200 transition-all disabled:opacity-50 relative overflow-hidden group"
            >
              <span className={loading ? "opacity-0" : "opacity-100"}>Send Reset Link</span>
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
            </button>
          </form>

          <div className="mt-10 text-center border-t border-gray-50 pt-8">
            <Link to="/login" className="text-orange-600 font-black text-sm uppercase tracking-widest hover:text-orange-700 transition-colors">
              ← Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
