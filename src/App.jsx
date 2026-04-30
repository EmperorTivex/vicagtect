import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Estates from "./pages/Estates";
import DrawBuild from "./pages/DrawBuild";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import PhaseOne from "./pages/PhaseOne";
import PhaseTwo from "./pages/PhaseTwo";
import PhaseThree from "./pages/PhaseThree";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard/Overview";
import Portfolio from "./components/Dashboard/Portfolio";
import Ajebo from "./pages/Ajebo";
import Overview from "./components/Dashboard/Overview";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import ForgotPassword from "./pages/ForgotPassword";
import Realties from "./pages/Realties";

/* Import inspiration from NIVAFER and VERITASI homes*/
const AdminRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/admin-login" />;
};
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for real-time auth changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
      } else {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("investorName");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-orange-100 border-t-orange-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Router>
      <Navbar />

      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/estates" element={<Estates />} />
          <Route path="/listings" element={<Estates />} />
          <Route path="/draw-build" element={<DrawBuild />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/phase1" element={<PhaseOne />} />
          <Route path="/phase2" element={<PhaseTwo />} />
          <Route path="/phase3" element={<PhaseThree />} />
          <Route path="/ajebo" element={<Ajebo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Overview /> : <Navigate to="/login" />}
          />
          <Route path="/dashboard/portfolio" element={<Portfolio />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin-panel"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route path="/realties" element={<Realties />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
