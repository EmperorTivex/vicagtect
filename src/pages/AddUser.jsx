import React from "react";
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function AddUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "logins"), {
        username,
        password,
      });
      setMessage("✅ User added successfully ");
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error("Error adding user:", err);
      setMessage("❌ Failed to add user");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">
        Add New User
      </h2>
      <form onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring focus:border-orange-600"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring focus:border-orange-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition"
        >
          Add User
        </button>
      </form>
      {message && <p className="text-center mt-4 text-sm">{message}</p>}
    </div>
  );
}

export default AddUser;
