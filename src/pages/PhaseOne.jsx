import React from "react";
import EstatePhase from "../components/EstatePhase";
import vicimg12 from "../assets/phase1/overhead/vicimg12.jpg";

const overheadImages = Object.values(
  import.meta.glob("../assets/phase1/overhead/*.{png,jpg,jpeg,svg}", {
    eager: true,
    query: "?url",
    import: "default",
  }),
);
const carcassImages = Object.values(
  import.meta.glob("../assets/phase1/carcass/*.{png,jpg,jpeg,svg}", {
    eager: true,
    query: "?url",
    import: "default",
  }),
);
const completedImages = Object.values(
  import.meta.glob("../assets/phase1/completed/*.{png,jpg,jpeg,svg}", {
    eager: true,
    query: "?url",
    import: "default",
  }),
);

const PhaseOne = () => {
  return (
    <EstatePhase
      title="King's Oil Estate Phase One"
      subtitle="Peaceful Living Starts Here"
      heroImage={vicimg12}
      aboutText="Located in the peaceful Simawa community of Ogun State, King's Oil Estate Phase I offers a well-structured environment for families, investors, and first-time landowners. With secure boundaries, developing infrastructure and easy access to nearby Lagos, it's a smart and serene place to call home."
      aerialImages={overheadImages}
      constructionImages={carcassImages}
      completedImages={completedImages}
      ctaTitle="Ready to Invest in Phase I?"
      ctaText="We're here to help you own land with peace of mind."
    />
  );
};

export default PhaseOne;
