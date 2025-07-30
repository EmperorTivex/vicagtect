function Login() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg -8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">
          Investor Login
        </h2>
        <form>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded mb-4"
          />
          <button className="w-full bg-orange -600 text-white py-2 rounded hover:bg-orange-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
