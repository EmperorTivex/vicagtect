import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const q = query(
        collection(db, "admins"),
        where("username", "==", username),
        where("password", "==", password)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        localStorage.setItem("isAdminLoggedIn", "true");
        navigate("/admin-panel");
      } else {
        setError("Invalid Admin credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occured during login.");
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">
          AdminLogin
        </h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring focus:border-orange-600"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring focus:border-orange-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition duration-300 ease-in-out"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
