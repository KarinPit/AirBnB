import RenterHeader from "../cmps/Header/RenterHeader";
import React from "react";
import { Outlet } from "react-router";

export default function MainRenterLayout() {
  return (
    <div className="main-layout">
      <RenterHeader />
      <Outlet />
      {/* <AppFooter /> */}
    </div>
  );
}
