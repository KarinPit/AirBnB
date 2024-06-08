import React from "react";
import { AppFooter } from "../cmps/Footer/AppFooter";

import { Outlet, useLocation } from "react-router-dom";
import { AppHeader } from "../cmps/Header/AppHeader";


const MainStayerLayout = () => {
  const location = useLocation().pathname;
  return (
    <div className={`main-layout ${location === "/" ? "" : "compact-layout"}`}>
      <hr></hr>
      <AppHeader location={location} />
      <main className={`${location === "/" ? "full" : ""}`}>
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
};
export default MainStayerLayout;
