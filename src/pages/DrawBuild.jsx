import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import struct from "../assets/structeng.jpg";
import sup from "../assets/constsupervise.jpg";
import arc from "../assets/arcdesigns.jpg";
import build from "../assets/buildconst.jpg";
import rend from "../assets/3Drend.jpg";
import engineer from "../assets/engineer.jpg";
import handshake from "../assets/handshake.jpg";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { 
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  },
  viewport: { once: true }
};

const services = [
  {
    icon: "🏗️",
    image: arc,
    title: "Architectural Designs",
    description: "Creative, functional plans tailored to your vision and lifestyle. We transform your ideas into detailed blueprints that balance aesthetics with practicality.",
    features: ["2D & 3D Floor Plans", "Space Optimization", "Sustainable Design"]
  },
  {
    icon: "⚙️",
    image: struct,
    title: "Structural Engineering",
    description: "Expert design and analysis for safe, reliable buildings. Our engineers ensure your structure can withstand environmental forces while maintaining cost-efficiency.",
    features: ["Load Analysis", "Foundation Design", "Safety Compliance"]
  },
  {
    icon: "🔨",
    image: build,
    title: "Building Construction",
    description: "From foundation to finish, we build with excellence. Our skilled craftsmen deliver quality construction that stands the test of time.",
    features: ["Quality Materials", "Skilled Workforce", "Timely Delivery"]
  },
  {
    icon: "👁️",
    image: sup,
    title: "Construction Supervision",
    description: "Professional oversight to ensure quality and compliance. We monitor every phase to guarantee your project meets the highest standards.",
    features: ["Quality Control", "Progress Monitoring", "Safety Management"]
  },
  {
    icon: "🎨",
    image: rend,
    title: "3D Rendering",
    description: "Visualize your project with stunning, realistic renderings. See your future home before construction begins with photorealistic visualizations.",
    features: ["Photorealistic Renders", "Virtual Walkthroughs", "Design Revisions"]
  }
];

const processSteps = [
  {
    step: "01",
    title: "Consultation",
    description: "Book a free consultation where we discuss your vision, requirements, and budget constraints.",
    icon: "💬"
  },
  {
    step: "02",
    title: "Planning",
    description: "Our team creates detailed architectural and structural plans tailored to your needs.",
    icon: "📐"
  },
  {
    step: "03",
    title: "Approval",
    description: "We handle all documentation and obtain necessary approvals from relevant authorities.",
    icon: "✅"
  },
  {
    step: "04",
    title: "Construction",
    description: "Our expert team builds your project with professional supervision at every stage.",
    icon: "🏗️"
  }
];

const DrawBuild = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={engineer} 
            alt="Construction" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/90 via-orange-800/80 to-orange-600/70" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-5 py-2 rounded-full bg-white/20 text-white text-sm font-black uppercase tracking-[0.2em] mb-6 backdrop-blur-sm">
              End-to-End Solutions
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight tracking-tight">
              Design & Build<br/>
              <span className="text-orange-200">Services</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 font-medium opacity-90 leading-relaxed">
              From architectural drawings to full construction execution — we bring your vision to life with honesty, professionalism, and uncompromising quality.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/contact")}
              className="bg-white text-orange-600 px-10 py-5 font-black rounded-full shadow-2xl hover:bg-orange-50 transition-all text-lg"
            >
              Start Your Project
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-black uppercase tracking-[0.2em] mb-4">
              What We Offer
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
              Our <span className="text-orange-600">Services</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive design and construction solutions tailored to transform your vision into reality.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-4xl bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                    {service.icon}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-black uppercase tracking-[0.2em] mb-4">
              Our Process
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
              How It <span className="text-orange-600">Works</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A streamlined approach from concept to completion, ensuring transparency and quality at every step.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative"
              >
                {idx < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-orange-300 to-transparent" />
                )}
                <div className="bg-gray-50 rounded-3xl p-8 text-center hover:bg-orange-50 transition-colors duration-300">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-lg mb-6">
                    <span className="text-3xl">{item.icon}</span>
                  </div>
                  <div className="text-5xl font-black text-orange-200 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-6 bg-orange-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <span className="inline-block px-4 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-[0.2em] mb-4">
                Why Vicagtect
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">
                Building Trust,<br/>One Project at a Time
              </h2>
              <div className="space-y-6">
                {[
                  { icon: "✓", title: "Licensed & Insured", desc: "Full compliance with Nigerian building regulations" },
                  { icon: "✓", title: "Experienced Team", desc: "Decades of combined expertise in design and construction" },
                  { icon: "✓", title: "Transparent Pricing", desc: "No hidden fees, detailed quotations from day one" },
                  { icon: "✓", title: "Quality Guaranteed", desc: "We stand behind our work with comprehensive warranties" }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">{item.title}</h4>
                      <p className="text-orange-100">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeInUp} className="relative">
              <img 
                src={handshake} 
                alt="Partnership" 
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-xl">
                <div className="text-4xl font-black text-orange-600">500+</div>
                <div className="text-gray-600 font-medium">Projects Completed</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              Ready to Build Your Dream?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Let's discuss your project. Get a free consultation and detailed quote within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/contact")}
                className="bg-orange-600 text-white px-10 py-5 font-black rounded-full shadow-xl hover:bg-orange-700 transition-all text-lg"
              >
                Request a Free Quote
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/estates")}
                className="bg-transparent border-2 border-white text-white px-10 py-5 font-black rounded-full hover:bg-white hover:text-gray-900 transition-all text-lg"
              >
                View Our Estates
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DrawBuild;
