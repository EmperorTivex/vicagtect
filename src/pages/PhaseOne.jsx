import React from "react";
import vicimg12 from "../assets/phase1/overhead/vicimg12.jpg";

const overheadImages = Object.values(
  import.meta.glob("../assets/phase1/overhead/*.{png,jpg,jpeg,svg}", {
    eager: true,
    query: "?url",
    import: "default",
  })
);
const carcassImages = Object.values(
  import.meta.glob("../assets/phase1/carcass/*.{png,jpg,jpeg,svg}", {
    eager: true,
    query: "?url",
    import: "default",
  })
);
const completedImages = Object.values(
  import.meta.glob("../assets/phase1/completed/*.{png,jpg,jpeg,svg}", {
    eager: true,
    query: "?url",
    import: "default",
  })
);

const PhaseOne = () => {
  return (
    <div className="text-gray-800">
      <section
        className="relative h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${vicimg12})` }}
      >
        <div className="bg-black/50 w-full h-full flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold text-center px-4">
            King's Oil Estate Phase One
          </h1>
          <br />
          <span className="text-orange-500">Peaceful Living Starts Here</span>
        </div>
      </section>
      <section className="p-6 md:p-12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">About the Estate</h2>
        <p>
          Located in the peaceful Simawa community of Ogun State, King's Oil
          Estate Phase I offers a well-structured environment for families,
          investors, and first-time landowners. With secure boundaries,
          developing infrastructure and easy access to nearby Lagos, it's a
          smart and serene place to call home.
        </p>
      </section>
      <section className="p-6 md:p-12 max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold mb-3">📷 Aerial Views</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {overheadImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Overhead view ${index + 1}`}
              className="rounded-lg shadow-md object-cover w-full h-48"
            />
          ))}
        </div>
        <h3 className="text-xl font-semibold mt-10 mb-3">
          🏗 Ongoing Construction
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {carcassImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Carcass view ${index + 1}`}
              className="rounded-lg shadow-md object-cover w-full h-48"
            />
          ))}
        </div>
        <h3 className="text-xl font-semibold mt-10 mb-3">🏠 Completed Homes</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {completedImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Completed home ${index + 1}`}
              className="rounded-lg shadow-md object-cover w-full h-48"
            />
          ))}
        </div>
      </section>
      <section className="bg-orange-500 text-white text-center py-10">
        <h3 className="text-2xl font-semibold mb-2">
          Ready to Invest in Phase I?
        </h3>
        <p>We're here to help you own land with peace of mind.</p>
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

export default PhaseOne;
