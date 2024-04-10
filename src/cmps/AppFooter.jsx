import React from "react";
import { useLocation } from "react-router";

export function AppFooter() {
  const location = useLocation();
  return (
    <div className={`app-footer `}>
      <p>© 2024 Airbnb, Inc</p>
      <p>Terms</p>
      <p>Sitemap</p>
      <p>Privacy</p>
      <p>Your Privacy Choices</p>
      <div>
        <p>Authors:</p>
        {/* <h1>Airbnb Footer</h1> */}
      </div>
    </div>
  );
}
