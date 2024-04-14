import React from "react";
import { AppFooter } from "../cmps/AppFooter";

import { Outlet } from "react-router-dom";
import StayerHeader from "../cmps/Header/StayerHeader";

const MainStayerLayout = () => (
  <div className="main-layout">
    <StayerHeader />
    <Outlet />
    <AppFooter />
  </div>
);
export default MainStayerLayout;
