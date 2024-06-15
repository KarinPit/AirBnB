import React from "react";
import { AppFooter } from "../cmps/Footer/AppFooter";
import { Outlet, useLocation } from "react-router-dom";
import { AppHeader } from "../cmps/Header/AppHeader";

export default function BookOrderLayout(){
  const location = useLocation().pathname;
  const layoutClass = location.includes("/order/") ? "order-layout" : location === "/" ? "" : "compact-layout";

  return (
    <div className={`main-layout ${layoutClass}`}>
      <AppHeader location={location} />
      <hr></hr>
      <main className={`${location === "/" ? "full" : ""}`}>
        <Outlet />
      </main>
      <AppFooter/>
    </div>
  );
};

