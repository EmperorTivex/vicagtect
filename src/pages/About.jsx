import React from "react";
import keys from "../assets/keys.jpg";
import { motion } from "framer-motion";
import vision from "../assets/vision.jpg";
import family from "../assets/family.jpg";
import handshake from "../assets/handshake.jpg";

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  return (
    <div className="bg-white text-gray-900 overflow-hidden">
      {/* Hero Section - Premium Branding */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gray-900 overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={family}
            alt="Background"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/60 to-gray-900 z-0"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-orange-600/20 text-orange-500 text-sm font-black uppercase tracking-[0.2em] mb-6">
              EST. 2009
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
              Welcome to <span className="text-orange-600">Vicagtect</span>{" "}
              Nigeria Ltd.
            </h1>
            <p className="text-xl md:text-3xl text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed italic">
              "Where your Search for Home Ends, and Peace of Mind Begins."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Narrative Section - Elegant Typography */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <motion.div {...fadeInUp}>
          <h2 className="text-sm font-black text-orange-600 uppercase tracking-widest mb-4">
            The Movement
          </h2>
          <p className="text-2xl md:text-3xl text-gray-800 font-bold mb-10 leading-tight">
            We built more than a company. We built a movement that makes housing{" "}
            <span className="text-orange-600 underline decoration-4 underline-offset-8">
              simple, secure, and human.
            </span>
          </p>
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-medium">
            <p>
              At Vicagtect, we understand that finding the right place to live
              in Nigeria - especially in busy cities like Lagos - can feel like
              a never-ending struggle.
            </p>
            <p>
              We're not just agents or middlemen. We're your housing allies,
              your trusted eyes and ears on the ground, and the bridge between
              your dream space and your reality.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Services Grid - Sophisticated Cards */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
              What We Do
            </h2>
            <div className="w-20 h-1.5 bg-orange-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🏠",
                title: "Verified Housing",
                text: "Discover options that actually fit your needs without the fake listings.",
              },
              {
                icon: "🛡️",
                title: "Scam Protection",
                text: "Avoid fraudulent schemes and time-wasting agents with our vetted process.",
              },
              {
                icon: "🤝",
                title: "Stress-Free Navigation",
                text: "We guide you through tenancy, rental, or purchase with absolute transparency.",
              },
              {
                icon: "💬",
                title: "Human Support",
                text: "Feel seen, heard, and supported through every single step of your journey.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50 hover:shadow-orange-100 hover:-translate-y-2 transition-all duration-500 border border-gray-100"
              >
                <div className="text-5xl mb-6">{item.icon}</div>
                <h3 className="text-xl font-black text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Philosophy - Visual Impact */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          {[
            {
              img: handshake,
              title: "Our Promise",
              content: [
                "We believe housing shouldn't feel like a hustle—it should feel like coming home.",
                "That's why we combine technology, local expertise, and a people-first mindset to offer housing solutions that make sense.",
              ],
            },
            {
              img: keys,
              title: "Our Mission",
              content: [
                "To eliminate housing stress for working Nigerians by offering reliable, affordable, and genuinely helpful real estate services that restore trust in the system.",
              ],
            },
            {
              img: vision,
              title: "Our Vision",
              content: [
                "A Nigeria where every hardworking citizen can access the home they deserve—without hassle, fear, or frustration.",
              ],
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              {...fadeInUp}
              transition={{ delay: idx * 0.2 }}
              className="group relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-950 via-orange-900/60 to-transparent"></div>
              <div className="absolute bottom-0 p-10 text-white">
                <h3 className="text-3xl font-black mb-4 tracking-tight">
                  {item.title}
                </h3>
                <div className="space-y-4 text-orange-50/90 font-medium leading-relaxed">
                  {item.content.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values Section - Elegant Minimalist List */}
      <section className="py-24 bg-white border-t border-gray-100 px-6">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
              Our Values
            </h2>
            <p className="text-gray-500 font-bold uppercase text-xs tracking-[0.3em]">
              The Vicagtect DNA
            </p>
          </header>

          <div className="space-y-12">
            {[
              {
                icon: "🤝",
                title: "Trust First",
                text: "We don't play games with people's lives or money.",
              },
              {
                icon: "👥",
                title: "Real Help, Real People",
                text: "No fake listings, no cold treatment. Authenticity is our baseline.",
              },
              {
                icon: "🌱",
                title: "Community over Commission",
                text: "Our Patrons are not transactions; they're lifelong relationships.",
              },
              {
                icon: "🏆",
                title: "Excellence Always",
                text: "We're building systems and spaces that raise the standard for the entire industry.",
              },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                className="flex items-start gap-8 group"
              >
                <div className="text-4xl p-4 bg-orange-50 rounded-2xl group-hover:bg-orange-600 group-hover:scale-110 transition-all duration-300">
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-lg text-gray-500 font-medium leading-relaxed">
                    {value.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...fadeInUp}
            className="mt-24 p-12 bg-orange-600 rounded-[3rem] text-center text-white shadow-2xl shadow-orange-200"
          >
            <h3 className="text-3xl font-black mb-4 tracking-tight">
              Join the Movement
            </h3>
            <p className="text-xl font-medium text-orange-50/90 mb-8 max-w-xl mx-auto leading-relaxed">
              We call our customers{" "}
              <span className="font-black text-white underline underline-offset-4 decoration-white/30">
                Patrons
              </span>
              —because you're the reason we exist. Your trust fuels our mission.
            </p>
            <button className="bg-white text-orange-600 px-10 py-4 rounded-full font-black text-lg hover:bg-orange-50 transition-all hover:scale-105 shadow-xl">
              Start Your Journey
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
