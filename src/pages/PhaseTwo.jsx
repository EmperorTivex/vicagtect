import React from "react";
import EstatePhase from "../components/EstatePhase";

const placeholder = "https://via.placeholder.com/400x300?text=Coming+Soon";

const PhaseTwo = () => {
  return (
    <EstatePhase
      title="King's Oil Estate Phase Two"
      subtitle="Exciting New Opportunities"
      heroImage={placeholder}
      aboutText="Details about King's Oil Estate Phase II will be available soon. Stay tuned for updates on location, features, and investment opportunities!"
      aerialImages={[placeholder, placeholder, placeholder]}
      constructionImages={[placeholder, placeholder, placeholder]}
      completedImages={[placeholder, placeholder, placeholder]}
      ctaTitle="Interested in Phase II?"
      ctaText="Contact us to get early information and reserve your spot."
    />
  );
};

export default PhaseTwo;
