import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="hidden md:block bg-white shadow h-screen w-64 p-5">
      <h2 className="text-xl font-bold text-orange-600 mb-6">Vicagtect</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/dashboard" className="text-gray-800 hover:text-orange-600">
            Dashboard
          </Link>
        </li>
        <li>
          {" "}
          <Link
            to="/dashboard/portfolio"
            className="text-gray-800 hover:text-orange-600"
          >
            Portfolio
          </Link>
        </li>
      </ul>
    </div>
  );
}
export default Sidebar;
