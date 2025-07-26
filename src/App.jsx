import { useState } from "react";
import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Estates from "./pages/Estates";
import DrawBuild from "./pages/DrawBuild";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import PhaseOne from "./pages/PhaseOne";
import PhaseTwo from "./pages/PhaseTwo";
import PhaseThree from "./pages/PhaseThree";
import Ajebo from "./pages/Ajebo";
/* Import inspiration from NIVAFER and VERITASI homes*/
export default function App() {
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
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
