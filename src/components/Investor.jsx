import React from "react";
import { Link } from "react-router-dom";

function Investor() {
  return (
    <div>
      <section>
        <h2>Are you a Vicagtect Realities Investor?</h2>
        <p>Log in to view your investment portfolio and updates.</p>
        <Link to="/login">
          <button className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700">
            Go to Investor Login
          </button>
        </Link>
      </section>
    </div>
  );
}

export default Investor;
