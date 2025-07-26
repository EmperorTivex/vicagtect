import construction2 from "../assets/construction2.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Constructionsection() {
  return (
    <motion.section
      className="py-10 md:py-16 bg-gray-100"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-center text-orange-500 mb-6 md:mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Our Construction Services
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 items-center mb-6">
          {/* Placeholder image until you upload a real one */}
          <motion.img
            src={construction2}
            alt="Construction Site"
            className="rounded-xl shadow-md w-full h-56 md:h-auto object-cover"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="mb-4 text-gray-700 text-base md:text-lg">
            From detailed architectural drawings to structural design and full
            building execution, Vicagtect provides a comprehensive 'Draw and
            Build ' service tailored to your needs.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm md:text-base">
            <li>Architectural & Structural Drawings.</li>
            <li>Building Construction with Integrity</li>
            <li>Supervised Projects by Certified Engineers</li>
            <li>Transparent and Affordable Pricing.</li>
          </ul>
          <Link
            to="/contact"
            className="mt-6 bg-orange-500 px-6 py-2 rounded-full hover:bg-range-600 transition w-full md:w-auto text-center block"
          >
            Start Your Project
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
export default Constructionsection;
