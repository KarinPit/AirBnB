import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  showErrorMsg,
  showSuccessMsg,
} from "../../services/other/event-bus.service.js";
import { login, logout, signup } from "../../store/actions/user.actions.js";
import { LoginSignup } from "./LoginSignup.jsx";
import FilterStay from "./FilterStay.jsx";
import MinimizedFilterStay from "./MinimizeFilterStay.jsx";
import Logo from "/svg/logo.svg";
import Language from "/svg/language.svg";
import LineMenu from "/svg/menu.svg";
import ProfileIcon from "/svg/profile.svg";
import Skeleton from "react-loading-skeleton";
import useWindowScroll from "../../customHooks/useWindowScroll.js";
import MobileFilter from "./MobileFilter.jsx";

export function AppHeader({ isCompact }) {
  const location = useLocation();
  const { scrollY } = useWindowScroll();
  const [isMinimize, setIsMinimize] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);
  const [showAccMenu, setShowAccMenu] = useState(false);
  const menuRef = useRef(null);
  const accMenuRef = useRef(null);

  const isClickTriggered = useRef(false);
  const prevScrollY = useRef(scrollY);



  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 850);
    }
    window.addEventListener("resize", handleResize);

    if (location.pathname === "/") {
      setIsMinimize(false);
    } else {
      setIsMinimize(true);
    }

    return () => {
      window.removeEventListener("resize", handleResize);

    }
  }, [location.pathname]);

  useEffect(() => {
    if (prevScrollY.current !== scrollY) {
      if (!isClickTriggered.current) {
        if (scrollY === 0 && isMinimize && location.pathname === "/") {
          setIsMinimize(false);
        } else if (scrollY > 0 && !isMinimize) {
          setIsMinimize(true);
        }
      } else {
        isClickTriggered.current = false;
      }
      prevScrollY.current = scrollY;
    }
  }, [scrollY, location.pathname, isMinimize]);

  const toggleMinimize = () => {
    isClickTriggered.current = true;
    setIsMinimize((prevState) => !prevState);
  };

  const user = useSelector((storeState) => storeState.userModule.user);
  const isLoading = useSelector(
    (storeState) => storeState.stayModule.isLoading
  );

  async function onLogin(credentials) {
    try {
      const user = await login(credentials);
      showSuccessMsg(`Welcome: ${user.fullname}`);
    } catch (err) {
      showErrorMsg("Cannot login");
    }
  }

  async function onSignup(credentials) {
    try {
      const user = await signup(credentials);
      showSuccessMsg(`Welcome new user: ${user.fullname}`);
    } catch (err) {
      showErrorMsg("Cannot signup");
    }
  }

  async function onLogout() {
    try {
      await logout();
      showSuccessMsg(`Bye now`);
    } catch (err) {
      showErrorMsg("Cannot logout");
    }
  }

  function handleClick(event) {
    if (accMenuRef.current && accMenuRef.current.contains(event.target)) {
      setShowAccMenu(true);
    } else if (menuRef.current.contains(event.target)) {
      setShowAccMenu((prev) => !prev);
    } else {
      setShowAccMenu(false);
    }
  }

  if (isMobile) return <MobileFilter />

  return (
    <header
      className={`header ${isMinimize ? "header--minimized" : "header--expanded"
        }`}
    >
      <div style={{ display: "flex", width: "100%" }}>
        <div className="top-options">
          <NavLink to="/" className="header__left">
            <img className="logo" src={Logo} alt="logo" />
          </NavLink>
          <div className="header__center">
            <div className="header__center-nav">
              <NavLink
                to="/"
                className={`header__center-link ${isMinimize ? "header__center-link--hidden" : ""
                  }`}
              >
                {!isLoading ? "Stays" : <Skeleton width={60} height={25} />}
              </NavLink>
            </div>

            {isMinimize ?
              <FilterStay
                isMinimize={isMinimize}
                changeMinimizeFilter={toggleMinimize}
              /> : ''}

          </div>
          <div className="header__right-container">
            <nav className="header__right-container__nav">
              <div className="header__right-container__nav__content">
                <NavLink to="/host/homes">
                  <button className="btn btn--dark">Airbnb your home</button>
                </NavLink>
                <div className="language">
                  <img src={Language} alt="Language" />
                </div>
                <div className="side-menu" onClick={handleClick} ref={menuRef}>
                  <img src={LineMenu} alt="Menu Icon" />
                  <div className="logged-acc">
                    {!user && <img src={ProfileIcon} alt="Profile Icon" />}
                    {user && <p>{user.fullname[0]}</p>}
                    {!user && showAccMenu && (
                      <div className="acc-modal" ref={accMenuRef}>
                        <div className="user-options">
                          <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                        </div>
                        <div className="extra-options">
                          <button>Airbnb your home</button>
                        </div>
                      </div>
                    )}
                    {user && showAccMenu && (
                      <div className="acc-modal" ref={accMenuRef}>
                        <div className="user-options">
                          <NavLink to={`/profile/buyer/${user._id}`}>
                            <button>Account</button>
                          </NavLink>
                        </div>
                        <div className="extra-options">
                          <button>Airbnb your home</button>
                          <button onClick={onLogout}>Logout</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>

        {isMinimize ? '' : <FilterStay
          isMinimize={isMinimize}
          changeMinimizeFilter={toggleMinimize}
        />}

      </div>
    </header>
  );
}