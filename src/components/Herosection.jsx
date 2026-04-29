import React from "react";
import { Link } from "react-router-dom";
import estateroad from "../assets/estateroad.jpg";
import { motion } from "framer-motion";

const Herosection = () => {
  return (
    <motion.section
      aria-label="Hero Section"
      className="relative w-full min-h-[85vh] flex items-center justify-center py-12 bg-cover bg-center"
      style={{ backgroundImage: `url(${estateroad})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <motion.div
        className="relative z-10 p-6 sm:p-10 text-white text-center w-full max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-orange-500 mb-6 leading-tight drop-shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Where Peace of Mind Begins
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl text-gray-100 mb-10 drop-shadow-md px-4 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          At Vicagtect, we're not just helping you find land or build a house,
          we're giving you peace of mind
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link
            to="/phase1"
            className="inline-block bg-orange-600 text-white font-bold px-10 py-4 rounded-full shadow-xl hover:bg-orange-700 hover:scale-105 transition-all duration-300 w-full sm:w-auto text-lg"
          >
            Explore Estates
          </Link>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
export default Herosection;
