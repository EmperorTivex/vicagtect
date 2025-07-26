import React from "react";

// Placeholder image (you can use a free placeholder service or your own)
// Example: https://via.placeholder.com/400x300
const placeholder = "https://via.placeholder.com/400x300?text=Coming+Soon";

const PhaseTwo = () => {
  return (
    <div className="text-gray-800">
      <section
        className="relative h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${placeholder})` }}
      >
        <div className="bg-black/50 w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-white text-4xl font-bold text-center px-4">
            King's Oil Estate Phase Two
          </h1>
          <span className="text-orange-500 mt-2">
            Exciting New Opportunities
          </span>
        </div>
      </section>
      <section className="p-6 md:p-12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">About the Estate</h2>
        <p>
          Details about King's Oil Estate Phase II will be available soon. Stay
          tuned for updates on location, features, and investment opportunities!
        </p>
      </section>
      <section className="p-6 md:p-12 max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold mb-3">📷 Aerial Views</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, idx) => (
            <img
              key={idx}
              src={placeholder}
              alt={`Overhead view placeholder ${idx + 1}`}
              className="rounded-lg shadow-md object-cover w-full h-48"
            />
          ))}
        </div>
        <h3 className="text-xl font-semibold mt-10 mb-3">
          🏗 Ongoing Construction
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, idx) => (
            <img
              key={idx}
              src={placeholder}
              alt={`Carcass view placeholder ${idx + 1}`}
              className="rounded-lg shadow-md object-cover w-full h-48"
            />
          ))}
        </div>
        <h3 className="text-xl font-semibold mt-10 mb-3">🏠 Completed Homes</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, idx) => (
            <img
              key={idx}
              src={placeholder}
              alt={`Completed home placeholder ${idx + 1}`}
              className="rounded-lg shadow-md object-cover w-full h-48"
            />
          ))}
        </div>
      </section>
      <section className="bg-orange-500 text-white text-center py-10">
        <h3 className="text-2xl font-semibold mb-2">Interested in Phase II?</h3>
        <p>Contact us to get early information and reserve your spot.</p>
        <a
          href="/contact"
          className="bg-white text-orange-500 px-6 py-2 rounded font-semibold hover:bg-orange-100 transition"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
};

export default PhaseTwo;
