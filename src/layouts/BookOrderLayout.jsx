import React from "react";
import { AppFooter } from "../cmps/Footer/AppFooter";
import { Outlet, useLocation } from "react-router-dom";
import { AppHeader } from "../cmps/Header/AppHeader";

const BookOrderLayout = () => {
  const location = useLocation().pathname;
  const layoutClass = location.includes("/order/") ? "order-layout" : location === "/" ? "" : "compact-layout";

  return (
    <div className={`main-layout ${layoutClass}`}>
      <hr></hr>
      <AppHeader location={location} />
      <main className={`${location === "/" ? "full" : ""}`}>
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
};

export default BookOrderLayout;
