import Herosection from "../components/Herosection";
import Constructionsection from "../components/Constructionsection";
import Investor from "../components/Investor";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Herosection />

      <Constructionsection />
      <div className="text-center my-8">
        <Link
          to="/realties"
          className="inline-block bg-orange-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-orange-700 transition"
        >
          Learn About Realties
        </Link>
      </div>
      <Investor />
    </div>
  );
}
export default Home;
