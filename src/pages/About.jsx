import React from "react";
import keys from "../assets/keys.jpg";
import { motion } from "framer-motion";
import vision from "../assets/vision.jpg";
import family from "../assets/family.jpg";
import handshake from "../assets/handshake.jpg";

const About = () => {
  return (
    <div className="bg-white text-black px-6 py-12 md:px-20 lg:px-32 ">
      <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-6">
        Welcome to Vicagtect Nigeria Ltd.
      </h1>
      <motion.p
        className="text-lg text-gray-800 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <strong>
          Where your Search for Home Ends, and Peace of Mind Begins.
        </strong>
      </motion.p>
      <motion.img src={family} />
      <p className="text-gray-700 mb-4">
        At Vicagtect, we understand that finding the right place to live in
        Nigeria-especially in busy cities like Lagos - can feel like a
        never-ending struggle. That's why we built more than a company. We built
        a movement-one that makes housing simple, secure and human.
      </p>
      <p className="text-gray-700 mb-4">
        We're not just agents or middlemen. We're your housing allies, your
        trusted eyes and ears on the ground, and the bridge between your dream
        space and your reality. Whether you're a young proffessional, a newlywed
        couple, or just someone tired of chasing landlords and listings, we're
        here to help you breathe easy again.
      </p>
      <h2 className="text-2xl font-semibold text-orange-500 mt-10 mb-4">
        {" "}
        What We Do
      </h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>Discover verified housing options that actually fit their needs</li>
        <li>Avoid scams and time-wasting agents</li>
        <li>
          Navigate tenancy, rental, or purchase processes with less stress.
        </li>
        <li>Feel seen, heard, and supported through every step</li>
      </ul>
      <p className="mt-4 text-gray-700">
        We call our customers <strong>Patrons</strong>- because they're the
        reason we do what we do. Thier trust fuels our mission.
      </p>
      <div className="flex flex-wrap justify-between gap-8">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-sm bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
          <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
            <img
              src={handshake}
              alt="Our Promise"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
          </div>
          <div className="relative bg-orange-700 text-gray-900 p-6 flex-grow">
            <h2 className="text-2xl font-semibold text-white-500 mb-3">
              {" "}
              Our Promise
            </h2>
            <p className="text-white-700 leading-relaxed mb-3">
              We believe housing shouldnt feel like a hustle. It should feel
              like coming home.
            </p>
            <p className="text-white-700 leading-relaxed mb-3">
              Thats why we combine technology, local expertise, and a
              people-first mindset to offer housing solutions that make
              sense-emotionally, financially, and practically.
            </p>
            <p className="text-white-700 leading-relaxed">
              Every home we connect you with is more than a space. Its a chance
              to live better and build community.
            </p>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-sm bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
          <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
            <motion.img
              src={keys}
              alt=""
              className=" w-full h-full object-cover"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
          </div>
          <div className="relative bg-orange-700 text-white p-6 flex-grow flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white-500  mb-3">
                Our Mission
              </h2>
              <p className="leading-relaxed">
                To eliminate housing stress for working Nigerians by offering
                reliable, affordable, and genuinely helpful real estate services
                that restore trust in the system.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-sm bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
          <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
            <motion.img
              src={vision}
              alt="Our Vision"
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
          </div>
          <div className="relative bg-orange-700 text-white p-6 flex-grow flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white-500 mt-10 mb-4">
                {" "}
                Our Vision
              </h2>
              <p className="text-white-700 mb-4">
                A NIgeria where every hardworking citizen can access the home
                they deserve-without hassle, fear, or frustration.
              </p>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-orange-500 mt-10 mb-4">
        Our Values
      </h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>
          <strong>Trust First</strong> -We dont play games with people's lives
          or money.
        </li>
        <li>
          <strong>Real Help, Real People</strong> -No fake listings, no cold
          treatment.
        </li>
        <li>
          <strong>Community over Commission</strong> - Our Patrons are not
          transactions; they're relationships.
        </li>
        <li>
          <strong>Excellence Always</strong>-We're building systems and spaces
          that raise the standard.
        </li>
      </ul>
    </div>
  );
};

export default About;
