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

  let lastScrollTop = 0;

  const handleScroll = () => {
    setIsHeaderCompact(window.scrollY > 0);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 850);
  };

  useEffect(() => {

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, []);

  return (
    <div className={`main-layout ${location === "/" ? "" : "compact-layout"}`}>
      <main className={`${location === "/" ? "full" : ""}`}>
        {!(isMobile && location.includes("/stay/")) && <AppHeader location={location} isCompact={isHeaderCompact} />}
        <Outlet />
      </main>
      {(isMobile ? <AppFooterMobile isVisible={isVisible} /> : <AppFooter />)}
    </div>
  );
}
export default MainStayerLayout;
