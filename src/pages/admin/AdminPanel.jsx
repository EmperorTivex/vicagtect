import React from "react";
import { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AdminPanel() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Active");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (isAdminLoggedIn !== "true") {
      navigate("/admin-login");
    }
  }, [navigate]);
  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin-login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !amount) {
      setMessage("Please fill in all fields.");
      return;
    }
    try {
      await addDoc(collection(db, "investors"), {
        name,
        amount,
        status,
        date: Timestamp.now(),
      });
      setMessage("Investor data saved ✅");
      setName("");
      setAmount("");
      setStatus("Active");
    } catch (err) {
      setMessage("Error saving data ❌ ");
      console.error(err);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-2 sm:px-4">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        aria-label="Logout"
      >
        Logout
      </button>
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-8 w-full max-w-md sm:max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">
          Admin Panel
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Investor Name"
            className="w-full mb-4 px-4 py-2 border rounded focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Amount Invested (₦)"
            className="w-full mb-4 px-4 py-2 border rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select
            className="w-full mb-4 px-4 py-2 border rounded "
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option> Active</option>
            <option>Pending</option>
            <option>Inactive</option>
          </select>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
          >
            Save Investor
          </button>
          {message && (
            <p className="mt-4 text-center text-sm text-gray-700">{message} </p>
          )}
        </form>
        <form action="">
          <input type="text" />
        </form>
      </div>
    </div>
  );
}

export default AdminPanel;
