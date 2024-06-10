import React,{useEffect,useState} from "react";
import { AppFooter } from "../cmps/Footer/AppFooter";

import { Outlet, useLocation } from "react-router-dom";
import { AppHeader } from "../cmps/Header/AppHeader";


const MainStayerLayout = () => {
  const location = useLocation().pathname;
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderCompact(window.scrollY > 0); 
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); 
  }, []);
  
  return (
    <div className={`main-layout ${location === "/" ? "" : "compact-layout"}`}>
      <hr></hr>
      {/* <StayerHeader /> */}
     <AppHeader location={location} isCompact={isHeaderCompact} />
      <main className={`${location === "/" ? "full" : ""}`}>
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
};
export default MainStayerLayout;
