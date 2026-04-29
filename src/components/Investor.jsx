import React from "react";
import { Link } from "react-router-dom";

function Investor() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-orange-50 rounded-3xl p-8 md:p-16 text-center shadow-xl border border-orange-100">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-800">
            Are you a <span className="text-orange-600">Vicagtect</span> Realties Investor?
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed">
            Log in to view your investment portfolio, track project progress, and see your latest updates.
          </p>
          <Link to="/login">
            <button className="bg-orange-600 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-orange-700 hover:scale-105 transform transition-all duration-300 text-lg">
              Go to Investor Login
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Investor;
