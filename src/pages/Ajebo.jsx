import React from "react";
import EstatePhase from "../components/EstatePhase";

const placeholder = "https://via.placeholder.com/400x300?text=Coming+Soon";

const Ajebo = () => {
  return (
    <EstatePhase
      title="King’s Oil Estate Ajebo"
      subtitle="Spiritual Calm. Great Investment."
      heroImage={placeholder}
      aboutText="Located near the Foursquare Gospel Church campground, King’s Oil Estate Ajebo combines spiritual tranquility with excellent investment potential. Enjoy easy access to the Lagos-Ibadan Expressway and a peaceful environment for your family or future projects."
      aerialImages={[placeholder, placeholder, placeholder]}
      constructionImages={[placeholder, placeholder, placeholder]}
      completedImages={[placeholder, placeholder, placeholder]}
      ctaTitle="Interested in Ajebo?"
      ctaText="Contact us to learn more or reserve your plot today."
    />
  );
};

export default Ajebo;
