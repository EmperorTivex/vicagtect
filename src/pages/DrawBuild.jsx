import React from "react";
import { useNavigate } from "react-router-dom";
import struct from "../assets/structeng.jpg";
import sup from "../assets/constsupervise.jpg";
import arc from "../assets/arcdesigns.jpg";
import build from "../assets/buildconst.jpg";
import rend from "../assets/3Drend.jpg";

const DrawBuild = () => {
  const navigate = useNavigate();
  return (
    <div className="px-4 py-12 bg-white text-gray-800">
      <h1 className="text-4xl font-bold text-orange-600 text-center mb-6">
        Design & Build services
      </h1>
      <p className="text-center max-w-3xl mx-auto text-lg mb-10">
        We provide end-to-end design and construction solutions. From
        architectural drawings to full construction execution - we bring your
        vision to life with honesty and proffessionalism.
      </p>
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 font-bold text-orange-500 mb-6 text-center">
          {" "}
          What We offer
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition">
            <img
              src={arc}
              alt="Architectural Designs"
              className="w-32 h-32 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-bold text-orange-600 mb-2">
              Architectural Designs
            </h3>
            <p className="text-gray-700 text-center">
              Creative, functional plans tailored to your vision and lifestyle
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition">
            <img
              src={struct}
              alt="Structural Engineering"
              className="w-32 h-32 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-bold text-orange-600 mb-2">
              Stuctural Engineering
            </h3>
            <p className="text-gray-700 text-center">
              {" "}
              Expert design and analysis for safe, reliable buildings.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition">
            <img
              src={build}
              alt="BUilding Construction"
              className="w-32 h-32 object-cover rounded-lg mb-4r"
            />
            <h3 className="text-lg font-bold text-orange-600 mb-2">
              Building Construction
            </h3>
            <p className="text-gray-700 text-center">
              From foundation to finish, we build with excellence.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition">
            <img
              src={sup}
              alt="Construction Supervision"
              className="w-32 h-32 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-bold text-orange-600 mb-2">
              {" "}
              Construction Supervision
            </h3>
            <p className="text-gray-700 text-center">
              Proffessional oversight to ensure quality and compliance.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition">
            <img
              src={rend}
              alt="3D Rendering"
              className="w-32 h-32 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-orange-600 mb-2">
              3D Rendering
            </h3>
            <p className="text-gray-700 text-center">
              {" "}
              Visualize your project with stunning, realisitic renderings.{" "}
            </p>
          </div>
        </div>
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
        <button
          className="bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-orange-700 transition"
          onClick={() => navigate("/contact")}
        >
          {" "}
          Request a Quote😁
        </button>
      </div>
    </div>
  );
};
export default DrawBuild;
