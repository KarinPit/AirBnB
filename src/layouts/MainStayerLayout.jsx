import React from "react";
import { AppFooter } from "../cmps/AppFooter";

import { Outlet, useLocation } from "react-router-dom";
import StayerHeader from "../cmps/Header/StayerHeader";
import { AppHeader } from "../cmps/AppHeader";

const MainStayerLayout = () => {
  const location = useLocation().pathname;

  return (
    <div className="main-layout">
      {/* <StayerHeader /> */}
      <AppHeader location={location} />
      <Outlet />
      <AppFooter />
    </div>
  );
};
export default MainStayerLayout;
