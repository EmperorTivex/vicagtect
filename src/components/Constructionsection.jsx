import construction2 from "../assets/construction2.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Constructionsection() {
  return (
    <motion.section
      className="py-12 md:py-20 bg-white"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Our <span className="text-orange-600">Construction</span> Services
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Placeholder image until you upload a real one */}
          <motion.img
            src={construction2}
            alt="Construction Site"
            className="rounded-2xl shadow-2xl w-full h-64 md:h-[450px] object-cover"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
              From detailed architectural drawings to structural design and full
              building execution, Vicagtect provides a comprehensive{" "}
              <span className="font-semibold text-orange-600">
                'Design and Build'
              </span>{" "}
              service tailored to your needs.
            </p>
            <ul className="space-y-4">
              {[
                "Architectural & Structural Drawings",
                "Building Construction with Integrity",
                "Supervised Projects by Certified Engineers",
                "Transparent and Affordable Pricing",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 text-base md:text-lg"
                >
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="inline-block mt-4 bg-orange-600 text-white font-bold px-8 py-3 rounded-full hover:bg-orange-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 w-full md:w-auto text-center"
            >
              Start Your Project
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
export default Constructionsection;
