import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import Logo from "/svg/logo.svg";
import Language from "/svg/language.svg";

import FilterStay from "./FilterStay.jsx";

export function AppHeader() {
  const location = useLocation();

  return (
    <header className={`app-header`}>
      <div className="top-row">
        <NavLink to={"/"}>
          <img className="logo" src={Logo} alt="Airbnb Logo" />
        </NavLink>

        <div
          className={`center-row ${
            location.pathname === "/" ? "" : "hide-center"
          }`}
        >
          <NavLink to="/">Stays</NavLink>
          <NavLink to="/experience">Experiences</NavLink>
          <NavLink to="/online-experience">Online Experiences</NavLink>
        </div>

        <div
          className={`filter-row ${
            location.pathname === "/" ? "hide-filter" : "minimized-filter"
          }`}
        >
          <FilterStay />
        </div>

        <div className="right-row">
          <a href="#">
            <button className="btn-dark">Airbnb your home</button>
          </a>

          <div>
            <img src={Language} alt="Language" />
          </div>

          <div>
            <h5>Account</h5>
          </div>
        </div>
      </div>

      <div
        className={`filter-row ${
          location.pathname === "/" ? "" : "hide-filter"
        }`}
      >
        <FilterStay />
      </div>
    </header>
  );
}
