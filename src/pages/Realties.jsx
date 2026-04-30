import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Realties() {
  const navigate = useNavigate();

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
      transition: { staggerChildren: 0.1 }
    },
    viewport: { once: true }
  };

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-orange-600 py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-[0.3em] mb-6">
              Invest with Confidence
            </span>
            <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
              Turn Your Savings Into <br/>
              <span className="text-orange-200">Real Estate Wealth</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 font-medium opacity-90 leading-relaxed">
              With Vicagtect Realties, your daily or monthly contributions grow with up to 30% ROI while being invested in real estate projects you can see and trust.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/contact")}
              className="bg-white text-orange-600 px-10 py-5 font-black rounded-full shadow-2xl hover:bg-orange-50 transition-all text-xl"
            >
              Start Your Contribution Today
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* The Problem & Solution Bridge */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeInUp} className="space-y-8">
            <h2 className="text-4xl font-black tracking-tight text-gray-900">
              The Reality of <span className="text-orange-600">Traditional Saving</span>
            </h2>
            <div className="space-y-6">
              {[
                { icon: "💸", title: "Shrinking Money", text: "Saving in banks often means fees and inflation eat your purchasing power." },
                { icon: "🏠", title: "Entry Barriers", text: "Real estate creates wealth, but the traditional entry point is too high for many." },
                { icon: "😔", title: "Market Risks", text: "Unverified investment opportunities can ruin financial stability." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="text-3xl p-4 bg-orange-50 rounded-2xl group-hover:bg-orange-600 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-500 font-medium">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            {...fadeInUp}
            className="bg-orange-50 rounded-[3rem] p-10 md:p-16 border border-orange-100 relative"
          >
            <div className="absolute -top-6 -right-6 text-6xl opacity-20">✨</div>
            <h2 className="text-3xl font-black mb-8 text-orange-600">Our Solutions</h2>
            <ul className="space-y-6">
              {[
                "Guaranteed ROI up to 30%",
                "Flexible daily/monthly contributions",
                "Fully verified legal contracts",
                "Backed by physical real estate assets",
                "Clear pathway to full land ownership"
              ].map((text, idx) => (
                <li key={idx} className="flex items-center gap-4 text-lg font-bold text-gray-700">
                  <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                  {text}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Investment Plans Section */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Investment Plans</h2>
            <p className="text-gray-500 font-bold uppercase text-xs tracking-[0.3em]">Choose Your Path to Wealth</p>
          </header>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                name: "18 Months", 
                duration: "1.5 Years", 
                roi: "11%", 
                min: "₦60,000", 
                bestFor: "Quick Returns",
                color: "orange"
              },
              { 
                name: "36 Months", 
                duration: "3 Years", 
                roi: "20%", 
                min: "₦30,000", 
                bestFor: "Steady Savers",
                color: "orange",
                featured: true
              },
              { 
                name: "60 Months", 
                duration: "5 Years", 
                roi: "30%", 
                min: "₦5,000", 
                bestFor: "Wealth Builders",
                color: "orange"
              }
            ].map((plan, idx) => (
              <motion.div 
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className={`relative bg-white p-10 rounded-[2.5rem] shadow-xl transition-all duration-500 border ${
                  plan.featured ? 'border-orange-600 scale-105 shadow-orange-100 z-10' : 'border-gray-100 hover:-translate-y-2'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-black mb-2 text-gray-900">{plan.name}</h3>
                <div className="text-5xl font-black text-orange-600 mb-6">{plan.roi} <span className="text-sm uppercase tracking-widest text-gray-400">ROI</span></div>
                
                <div className="space-y-4 mb-10 border-t border-gray-50 pt-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-bold uppercase">Duration</span>
                    <span className="font-bold text-gray-700">{plan.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-bold uppercase">Minimum</span>
                    <span className="font-bold text-gray-700">{plan.min}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400 font-bold uppercase">Target</span>
                    <span className="font-bold text-gray-700">{plan.bestFor}</span>
                  </div>
                </div>

                <button 
                  onClick={() => navigate("/contact")}
                  className={`w-full py-4 rounded-2xl font-black transition-all ${
                    plan.featured ? 'bg-orange-600 text-white shadow-lg shadow-orange-200 hover:bg-orange-700' : 'bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                >
                  Choose Plan
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms & Why Us */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div {...fadeInUp} className="bg-gray-900 text-white p-12 md:p-16 rounded-[3rem] shadow-2xl">
            <h2 className="text-3xl font-black mb-10 tracking-tight text-orange-500">Important Terms</h2>
            <div className="space-y-8">
              {[
                { icon: "⏳", title: "Maturity", desc: "Payout is issued only at the completion of your selected plan." },
                { icon: "🚫", title: "Early Exit", desc: "10% administrative penalty applies and ROI is forfeited for early withdrawals." },
                { icon: "⏰", title: "Consistency", desc: "Late or inconsistent payments may affect your final ROI calculation." },
                { icon: "📜", title: "Legal Safety", desc: "A binding legal contract is signed by both parties before you begin." }
              ].map((term, idx) => (
                <div key={idx} className="flex gap-6">
                  <span className="text-3xl">{term.icon}</span>
                  <div>
                    <h4 className="font-black text-lg mb-1">{term.title}</h4>
                    <p className="text-gray-400 font-medium leading-relaxed">{term.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeInUp} className="flex flex-col justify-center space-y-10 lg:pl-12">
            <h2 className="text-4xl font-black tracking-tight text-gray-900">
              Why Choose <br/><span className="text-orange-600 text-5xl">Vicagtect Realties?</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                "ROI 11–30%",
                "Start with just ₦5,000",
                "Backed by Simawa Assets",
                "Protected by Contracts",
                "Flexible Payment Options",
                "Transparent Tracking"
              ].map((point, idx) => (
                <div key={idx} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-orange-100 transition-all group">
                  <p className="font-bold text-gray-700 group-hover:text-orange-600 transition-colors">✨ {point}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-orange-50 px-6">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Common Questions</h2>
            <p className="text-gray-500 font-bold uppercase text-xs tracking-[0.3em]">Everything You Need to Know</p>
          </header>

          <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="space-y-6">
            {[
              { q: "Is my money safe?", a: "Yes, every contribution is legally contracted and backed by our tangible real estate assets in Simawa and other growing communities." },
              { q: "Can I withdraw anytime?", a: "While we encourage finishing your plan for maximum ROI, you can withdraw early subject to a 10% penalty and forfeiture of accrued interest." },
              { q: "What if I miss a payment?", a: "We understand life happens. While ROI might be slightly adjusted for inconsistency, your principal remains secure. Just resume as soon as possible." },
              { q: "How do I make payments?", a: "All payments are made via official bank transfers or our approved secure payment channels for absolute transparency." }
            ].map((faq, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                className="bg-white p-8 rounded-3xl shadow-sm border border-orange-100/50 hover:shadow-md transition-shadow"
              >
                <h4 className="text-xl font-black text-gray-900 mb-3 flex items-center gap-3">
                  <span className="text-orange-600 text-2xl">Q:</span> {faq.q}
                </h4>
                <p className="text-gray-600 font-medium leading-relaxed pl-9">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-orange-600 py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <motion.div {...fadeInUp} className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tight leading-tight">
            Don't let your money sit idle. <br/>
            <span className="text-orange-200">Start building your legacy.</span>
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/contact")}
            className="bg-white text-orange-600 px-12 py-5 font-black rounded-full shadow-2xl hover:bg-orange-50 transition-all text-2xl mb-12"
          >
            Start Your Contribution Now
          </motion.button>
          
          <div className="grid md:grid-cols-3 gap-8 text-white/90 font-bold pt-12 border-t border-white/20">
            <div className="space-y-2">
              <span className="block text-xs uppercase tracking-widest opacity-50">Visit Us</span>
              <p>Sweet Promise Plaza, Mowe</p>
            </div>
            <div className="space-y-2">
              <span className="block text-xs uppercase tracking-widest opacity-50">Call Us</span>
              <p>08100626704</p>
            </div>
            <div className="space-y-2">
              <span className="block text-xs uppercase tracking-widest opacity-50">Email Us</span>
              <p>info@vicagtect.com</p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default Realties;
