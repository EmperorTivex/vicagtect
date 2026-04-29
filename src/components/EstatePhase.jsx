import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const EstatePhase = ({
  title,
  subtitle,
  heroImage,
  aboutText,
  aerialImages = [],
  constructionImages = [],
  completedImages = [],
  ctaTitle,
  ctaText,
}) => {
  return (
    <div className="text-gray-800">
      {/* Hero Section */}
      <section
        className="relative h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="bg-black/50 w-full h-full flex flex-col items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-4xl md:text-5xl font-bold text-center px-4"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-orange-500 mt-2 text-xl font-medium"
            >
              {subtitle}
            </motion.span>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="p-8 md:p-16 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-orange-500 inline-block">
          About the Estate
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">{aboutText}</p>
      </section>

      {/* Gallery Sections */}
      <section className="p-8 md:p-16 max-w-7xl mx-auto bg-gray-50">
        {aerialImages.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-2xl">📷</span> Aerial Views
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {aerialImages.map((image, idx) => (
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  key={idx}
                  src={image}
                  alt={`Aerial view ${idx + 1}`}
                  className="rounded-xl shadow-lg object-cover w-full h-64 cursor-pointer"
                />
              ))}
            </div>
          </div>
        )}

        {constructionImages.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-2xl">🏗</span> Ongoing Construction
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {constructionImages.map((image, idx) => (
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  key={idx}
                  src={image}
                  alt={`Construction view ${idx + 1}`}
                  className="rounded-xl shadow-lg object-cover w-full h-64 cursor-pointer"
                />
              ))}
            </div>
          </div>
        )}

        {completedImages.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-2xl">🏠</span> Completed Homes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {completedImages.map((image, idx) => (
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  key={idx}
                  src={image}
                  alt={`Completed home ${idx + 1}`}
                  className="rounded-xl shadow-lg object-cover w-full h-64 cursor-pointer"
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-orange-600 text-white text-center py-16 px-6">
        <h3 className="text-3xl font-bold mb-4">{ctaTitle}</h3>
        <p className="text-xl mb-8 opacity-90">{ctaText}</p>
        <Link
          to="/contact"
          className="inline-block bg-white text-orange-600 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-orange-50 hover:scale-105 transition-all duration-300"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
};

export default EstatePhase;
