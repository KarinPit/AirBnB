import React, { useEffect, useState } from "react";
import { AppFooter } from "../cmps/Footer/AppFooter";
import AppFooterMobile from "../cmps/Footer/AppFooterMobile";

import { Outlet, useLocation } from "react-router-dom";
import { AppHeader } from "../cmps/Header/AppHeader";

const MainStayerLayout = () => {
  const location = useLocation().pathname;
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      setIsHeaderCompact(window.scrollY > 0);
    };
    // handleResize();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`main-layout ${location === "/" ? "" : "compact-layout"}`}>
      <main className={`${location === "/" ? "full" : ""}`}>
      {!(isMobile && location.includes("/stay/")) && !(location.includes("profile/renter") || location.includes("profile/buyer")) && <AppHeader location={location} isCompact={isHeaderCompact} />}        <Outlet />
      </main>
      {(!location.includes("profile/renter") && !location.includes("profile/buyer")) && (isMobile ? <AppFooterMobile isVisible={isVisible} /> : <AppFooter />)}    </div>
  );
}
export default MainStayerLayout;
