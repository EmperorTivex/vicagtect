import React from "react";
import EstatePhase from "../components/EstatePhase";

const placeholder = "https://via.placeholder.com/400x300?text=Coming+Soon";

const PhaseThree = () => {
  return (
    <EstatePhase
      title="King's Oil Estate Phase III"
      subtitle="Fresh Start. Growing Community."
      heroImage={placeholder}
      aboutText="The newest development in Simawa, King's Oil Estate Phase III is an expansion that reflects our commitment to thoughtful planning and community living. It’s ideal for young families, growing investors, and anyone seeking a fresh start in a promising area with proven growth."
      aerialImages={[placeholder, placeholder, placeholder]}
      constructionImages={[placeholder, placeholder, placeholder]}
      completedImages={[placeholder, placeholder, placeholder]}
      ctaTitle="Start Fresh in Phase III"
      ctaText="Join a growing community in Simawa. Reach out today."
    />
  );
};

export default PhaseThree;
