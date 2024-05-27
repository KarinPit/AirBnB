import React from "react";
import { AppFooter } from "../cmps/AppFooter";

import { Outlet, useLocation } from "react-router-dom";
import StayerHeader from "../cmps/Header/StayerHeader";
import { AppHeader } from "../cmps/AppHeader";

const MainStayerLayout = () => {
  const location = useLocation().pathname;
  // className={`${location === '/' ? 'full' : ''}`}
  return (
    <div className={`main-layout ${location === "/" ? "" : "compact-layout"}`}>
      <hr></hr>
      {/* <StayerHeader /> */}
      <AppHeader location={location} />
      <main className={`${location === "/" ? "full" : ""}`}>
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
};
export default MainStayerLayout;
