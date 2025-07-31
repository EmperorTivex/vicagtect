import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dummyUser = {
    username: "Tise",
    password: "emperor",
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === dummyUser.username && password === dummyUser.password) {
      setError("");
      navigate("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg -8 w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">
          Investor Login
        </h2>
        <form>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring focus:border-orange-600"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring focus:border-orange-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mb-2"> {error}</p>}
          <button
            type="submit"
            className="w-full bg-orange -600 text-white py-2 rounded hover:bg-orange-700 transition duration-300 ease-in-out"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
