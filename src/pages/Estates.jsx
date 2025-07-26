import React from "react";
import Estatecard from "../components/Estatecard";
import phase1 from "../assets/phase1.jpg";
import phase2 from "../assets/phase2.jpg";
import phase4 from "../assets/phase4.jpg";
import vicimg11 from "../assets/phase1/overhead/vicimg11.jpg";
import { Link } from "react-router-dom";

const estateData = [
  {
    title: "King's Oil Estate Phase I",
    location: "Simawa, Ogun State",
    description:
      "A peaceful, well-structured estate ideal for families, investors, and first-time landowners. Close to Lagos, with secure boundaries and growing infrastructure.",
    image: phase1,
    link: "/phase1",
  },
  {
    title: "King's Oil Estate Phase II",
    location: "Simawa, Ogun State",
    description:
      "More spacious plots and upgraded layout plans. A great option for modern living with long-term value, close to Lagos but stress-free.",
    image: vicimg11,
    link: "/phase2",
  },
  {
    title: "King's Oil Estate Phase III",
    location: "Simawa, Ogun State",
    description:
      "Our newest development. Designed with community and young families in mind. Great for those seeking fresh beggining in a high-growth area.",
    image: phase2,
    link: "/phase3",
  },
  {
    title: "King's Oil Estate Ajebo",
    location: "Ajebo, Ogun State",
    description:
      " Near Foursquare  Gospel Church campground. Combines spiritual calm and great investment potential. Easy access to Logos-Ibadan Expressway.",
    image: phase4,
    link: "/ajebo",
  },
];

const Estates = () => {
  return (
    <div className="px-6 py-12 bg-white text-black">
      <h1 className="text-3xl font-bold mb-8 text-center text-orange-600">
        {" "}
        Our Estates
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        {estateData.map((estate, index) => (
          <div key={index} className="flex flex-col gap-4">
            <Estatecard
              title={estate.title}
              location={estate.location}
              description={estate.description}
              image={estate.image}
            />

            {estate.link && (
              <Link
                to={estate.link}
                className="inline-block bg-orange-500 text-white font-semibold px-4 py-2 rounded-full shadow hover:bg-orange-600 transition w-full text-center"
              >
                View {estate.title}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Estates;
