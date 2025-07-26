import React from "react";

const EstateCard = ({ title, location, description, image }) => {
  return (
    <div className="border rounded-2xl shadow-md p-6 bg-orange-50 hover:shadow-lg transition duration-300">
      <img src={image} alt={title} className="rounded-lg shadow-lg" />
      <h2 className="text-xl font-semibold text-orange-700">{title}</h2>
      <p className="text-sm text-gray-600 italic mb-2">{location}</p>
      <p className="text-gray-800">{description}</p>
    </div>
  );
};
export default EstateCard;
