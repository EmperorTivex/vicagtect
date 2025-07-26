import React from "react";

const DrawBuild = () => {
  return (
    <div className="px-4 py-12 bg-white text-gray-800">
      <h1 className="text-4xl font-bold text-orange-600 text-center mb-6">
        Draw & Build services
      </h1>
      <p className="text-center max-w-3xl mx-auto text-lg mb-10">
        We provide end-to-end design and construction solutions. From
        architectural drawings to full construction execution - we bring your
        vision to life with honesty and proffessionalism.
      </p>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">
          {" "}
          What We offer
        </h2>
        <ul className="space-y-4 list-disc pl-6">
          <li>Architectural Designs</li>
          <li>Structural Engineering Plans</li>
          <li>Building Construction</li>
          <li>Construction Supervision</li>
          <li>3D Rendering and Visualization</li>
        </ul>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">
          {" "}
          How It Works
        </h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Book a free consultation</li>
          <li>We understand your need and budget </li>
          <li>Our team draws your approved building plan</li>
          <li>We begin and supervise construction</li>
        </ol>
      </section>
      <div className="text-center mt-10">
        <button className="bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-700 transition">
          {" "}
          Request a Quote
        </button>
      </div>
    </div>
  );
};
export default DrawBuild;
