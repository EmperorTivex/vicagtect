import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import phase1 from "../assets/phase1.jpg";
import phase2 from "../assets/phase2.jpg";
import phase4 from "../assets/phase4.jpg";
import vicimg11 from "../assets/phase1/overhead/vicimg11.jpg";

const estateData = [
  {
    title: "King's Oil Estate Phase I",
    location: "Simawa, Ogun State",
    description:
      "A peaceful, well-structured estate ideal for families, investors, and first-time landowners. Close to Lagos, with secure boundaries and growing infrastructure.",
    image: phase1,
    link: "/phase1",
    tag: "Highly Developed",
  },
  {
    title: "King's Oil Estate Phase II",
    location: "Simawa, Ogun State",
    description:
      "More spacious plots and upgraded layout plans. A great option for modern living with long-term value, close to Lagos but stress-free.",
    image: vicimg11,
    link: "/phase2",
    tag: "Investment Choice",
  },
  {
    title: "King's Oil Estate Phase III",
    location: "Simawa, Ogun State",
    description:
      "Our newest development. Designed with community and young families in mind. Great for those seeking fresh beggining in a high-growth area.",
    image: phase2,
    link: "/phase3",
    tag: "New Launch",
  },
  {
    title: "King's Oil Estate Ajebo",
    location: "Ajebo, Ogun State",
    description:
      "Near Foursquare Gospel Church campground. Combines spiritual calm and great investment potential. Easy access to Logos-Ibadan Expressway.",
    image: phase4,
    link: "/ajebo",
    tag: "Spiritual Calm",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

const Estates = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      {/* Hero Header */}
      <section className="relative py-20 px-6 bg-gray-900 text-white text-center">
        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-orange-600/20 text-orange-500 text-sm font-black uppercase tracking-[0.3em] mb-4">
            Our Portfolio
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            Premium <span className="text-orange-600">Real Estate</span>{" "}
            Listings
          </h1>
          <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Discover verified lands and housing opportunities designed for
            growth, security, and absolute peace of mind.
          </p>
        </motion.div>
      </section>

      {/* Grid Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid md:grid-cols-2 gap-12"
        >
          {estateData.map((estate, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -15,
                transition: { duration: 0.4, ease: "easeOut" },
              }}
              className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden">
                <motion.img
                  src={estate.image}
                  alt={estate.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                {/* Tag */}
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-orange-600 text-xs font-black uppercase tracking-widest shadow-lg">
                    {estate.tag}
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-10 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight group-hover:text-orange-600 transition-colors">
                      {estate.title}
                    </h2>
                    <p className="flex items-center gap-2 text-orange-500 font-bold text-sm uppercase tracking-widest mt-1">
                      <span className="text-lg">📍</span> {estate.location}
                    </p>
                  </div>
                </div>

                <p className="text-gray-500 font-medium leading-relaxed mb-8 flex-grow">
                  {estate.description}
                </p>

                {/* Interactive Button */}
                <Link
                  to={estate.link}
                  className="relative group/btn overflow-hidden"
                >
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-center text-lg shadow-xl group-hover/btn:bg-orange-600 transition-all duration-300 relative z-10"
                  >
                    View Estate Details
                  </motion.div>
                  <div className="absolute inset-0 bg-orange-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 rounded-2xl"></div>
                </Link>
              </div>

              {/* Decorative 3D Shadow Overlay */}
              <div className="absolute inset-0 pointer-events-none rounded-[2.5rem] ring-1 ring-inset ring-gray-900/5 group-hover:ring-orange-600/20 transition-all"></div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 bg-gray-50 px-6 text-center border-t border-gray-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-orange-600 rounded-[3rem] p-12 text-white shadow-2xl shadow-orange-200"
        >
          <h2 className="text-4xl font-black mb-6 tracking-tight">
            Don't See What You're Looking For?
          </h2>
          <p className="text-xl font-medium text-orange-50/90 mb-10 leading-relaxed">
            Our portfolio is constantly expanding. Contact our consultants for
            exclusive off-market listings and upcoming developments.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-orange-600 px-12 py-5 rounded-full font-black text-xl shadow-xl hover:bg-orange-50 hover:scale-105 transition-all duration-300"
          >
            Request Custom Search
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Estates;
