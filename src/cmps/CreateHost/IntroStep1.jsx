import React from "react";

const introData = [
  {
    title: "Tell us about your place",
    details:
      "Share some basic info, like where it is and how many guests can stay.",
    image: "/public/assets/img/create-host/about-place.webp",
  },
  {
    title: "Make it stand out",
    details:
      "Add 5 or more photos plus a title and description—we’ll help you out.",
    image: "/public/assets/img/create-host/stand-out.webp",
  },
  {
    title: "Finish up and publish",
    details:
      "Choose if you'd like to start with an experienced guest, set a starting price, and publish your listing.",
    image: "/public/assets/img/create-host/publish.webp",
  },
];

export default function IntroStep1() {
  return (
    <section className="intro-step-1">
      <div className="intro-step-1-title">
        <h1>It’s easy to get started on Airbnb</h1>
      </div>
      <div className="intro-step-1-items">
        {introData.map((intro, index) => (
          <div className="intro-step-1-item" key={index}>
            <div className="intro-step-1-number">{index + 1}</div>
            <div className="intro-step-1-details">
              <h2>{intro.title}</h2>
              <h3>{intro.details}</h3>
            </div>
            <div className="intro-step-1-image">
              <img
                src={intro.image}
                alt={`Step ${index + 1}: ${intro.title}`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
