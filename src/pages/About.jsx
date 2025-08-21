import React from "react";
import keys from "../assets/keys.jpg";
import { motion } from "framer-motion";
import vision from "../assets/vision.jpg";
import family from "../assets/family.jpg";
import handshake from "../assets/handshake.jpg";

const About = () => {
  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-orange-100 text-black px-4 py-8 md:px-16 lg:px-32 ">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-orange-600 mb-4 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2.0 }}
      >
        Welcome to Vicagtect Nigeria Ltd.
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl text-gray-800 mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <strong>
          Where your Search for Home Ends, and Peace of Mind Begins.
        </strong>
      </motion.p>
      <motion.img
        src={family}
        className="mx-auto rounded-lg shadow-lg mb-8 w-full max-w-lg"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />
      <div className="max-w-3xl mx-auto">
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          At Vicagtect, we understand that finding the right place to live in
          Nigeria - especially in busy cities like Lagos - can feel like a
          never-ending struggle. That's why we built more than a company. We
          built a movement, one that makes housing simple, secure and human.
        </p>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          We're not just agents or middlemen. We're your housing allies, your
          trusted eyes and ears on the ground, and the bridge between your dream
          space and your reality. Whether you're a young proffessional, a
          newlywed couple, or just someone tired of chasing landlords and
          listings, we're here to help you breathe easy again.
        </p>
      </div>
      <div className="my-10 border-t border-orange-200"></div>
      <h2 className="text-3xl font-bold text-orange-500 text-center mb-4">
        {" "}
        What We Do
      </h2>
      <ul className="list-none text-gray-800 mb-8 max-w-2xl mx-auto space-y-3">
        <li className="flex items-center gap-2">
          <span className="text-orange-500 text-xl">🏠</span>
          <span>
            Discover verified housing options that actually fit their needs
          </span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-orange-500 text-xl">🛡️</span>
          <span>Avoid scams and time-wasting agents</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-orange-500 text-xl">🤝</span>
          <span>
            {" "}
            Navigate tenancy, rental, or purchase processes with less stress.
          </span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-orange-500 text-xl">💬</span>
          <span>Feel seen, heard, and supported through every step</span>
        </li>
      </ul>
      <p className="mt-4 text-gray-700 text-center text-lg">
        We call our customers{" "}
        <span className="font-bold text-orange-600">Patrons</span>- because
        you're the reason we do what we do. Your trust fuels our mission.
      </p>
      <div className="my-10 border-t border-orange-200"></div>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-sm bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:scale-105 transition">
          <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
            <img
              src={handshake}
              alt="Our Promise"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>
          </div>
          <div className="relative bg-orange-700 text-white p-6 flex-grow">
            <h2 className="text-2xl font-semibold mb-3"> Our Promise</h2>
            <p className="leading-relaxed mb-3">
              We believe housing shouldnt feel like a hustle-it should feel like
              coming home.
            </p>
            <p className="leading-relaxed mb-3">
              Thats why we combine technology, local expertise, and a
              people-first mindset to offer housing solutions that make
              sense-emotionally, financially, and practically.
            </p>
            <p className="leading-relaxed">
              Every home we connect you with is more than a space. Its a chance
              to live better and build community.
            </p>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-sm bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:scale-105 transition">
          <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
            <motion.img
              src={keys}
              alt=""
              className=" w-full h-full object-cover"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>
          </div>
          <div className="relative bg-orange-700 text-white p-6 flex-grow flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
              <p className="leading-relaxed">
                To eliminate housing stress for working Nigerians by offering
                reliable, affordable, and genuinely helpful real estate services
                that restore trust in the system.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-sm bg-white rounded-xl shadow-lg overflow-hidden flex flex-col hover:scale-105 transition">
          <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
            <motion.img
              src={vision}
              alt="Our Vision"
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>
          </div>
          <div className="relative bg-orange-700 text-white p-6 flex-grow flex flex-col justify-between">
            <h2 className="text-2xl font-semibold mb-3"> Our Vision</h2>
            <p className="mb-4">
              A NIgeria where every hardworking citizen can access the home they
              deserve-without hassle, fear, or frustration.
            </p>
          </div>
        </div>
      </div>
      <div className="my-10 border-t border-orange-200"></div>
      <h2 className="text-3xl font-bold text-orange-500 mb-4 text-center">
        Our Values
      </h2>
      <ul className="list-none text-gray-800 space-y-3 max-w-2xl mx-auto">
        <li className="flex items-center gap-2">
          <span className="text-orange-500 text-xl">🤝</span>
          <span>
            <strong>Trust First</strong> -We dont play games with people's lives
            or money.
          </span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-orange-500 text-xl">👥</span>
          <strong>Real Help, Real People</strong> -No fake listings, no cold
          treatment.
        </li>
        <li className="flex items-center gap-2">
          <span className="text-orange-500 text-xl">🌱</span>
          <strong>Community over Commission</strong> - Our Patrons are not
          transactions; they're relationships.
        </li>
        <li className="flex items-center gap-2">
          <span className="text-orange-500 text-xl">🏆</span>
          <strong>Excellence Always</strong>-We're building systems and spaces
          that raise the standard.
        </li>
      </ul>
    </div>
  );
};

export default About;
