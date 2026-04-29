import Herosection from "../components/Herosection";
import Constructionsection from "../components/Constructionsection";
import Investor from "../components/Investor";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="overflow-hidden">
      <Herosection />

      <Constructionsection />
      
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Explore Our <span className="text-orange-600">Realties</span>
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Discover verified housing options and investment opportunities that actually fit your needs.
          </p>
          <Link
            to="/realties"
            className="inline-block bg-white text-orange-600 border-2 border-orange-600 px-10 py-4 rounded-full font-bold shadow-lg hover:bg-orange-600 hover:text-white hover:scale-105 transition-all duration-300"
          >
            Learn About Realties
          </Link>
        </div>
      </section>

      <Investor />
    </div>
  );
}
export default Home;
