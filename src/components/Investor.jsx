import React from "react";
import { Link } from "react-router-dom";

function Investor() {
  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-600">
        Are you a Vicagtect Realties Investor?
      </h2>
      <p className="text-lg text-gray-600 mb-4">
        Log in to view your investment portfolio and updates.
      </p>
      <Link to="/login">
        <button className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700">
          Go to Investor Login
        </button>
      </Link>
    </div>
  );
}

export default Investor;
