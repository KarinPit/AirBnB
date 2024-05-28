import React from "react";
import { useLocation } from "react-router";

export function AppFooter() {
  const location = useLocation();
  return (
    <div className={`app-footer `}>
      <p>© 2024 Airbnb, Inc</p>
    </div>
  );
}
