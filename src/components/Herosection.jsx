import React from "react";
import { Link } from "react-router-dom";
import estateroad from "../assets/estateroad.jpg";
import { motion } from "framer-motion";

const Herosection = () => {
  return (
    <motion.section
      aria-label="Hero Section"
      className="relative w-full min-h-screen flex items-center justify-center   py-8 bg-cover bg-center "
      style={{ backgroundImage: `url(${estateroad})` }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 4, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/0 " />
      <motion.div
        className="relative z-10   p-4 sm:p-8 text-white text-center w-full max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 5.0, delay: 0.7 }}
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-600 mb-6 leading-tight drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Where Peace of Mind Begins
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-white-700 mb-8 drop-shadow px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          At Vicagtect, we're not just helping you find land or build a house,
          we're giving you peace of mind
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link
            to="/phase1"
            href="#estates"
            className="block sm:inline-block bg-orange-500 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-orange-600 transition-all duration-300 w-full sm:w-auto"
          >
            Explore Estates
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
export default Herosection;
