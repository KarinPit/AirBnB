import React from "react";
import { AppFooter } from "../cmps/AppFooter";
import { AppHeader } from "../cmps/AppHeader";

import { Outlet } from "react-router-dom";

const MainLayout = () => (
  <div className="main-layout">
    <AppHeader />
    <Outlet />
    <AppFooter />
  </div>
);
export default MainLayout;
