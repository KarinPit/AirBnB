import { NavLink, useLocation } from "react-router-dom";

import Logo from "/svg/logo.svg";
import Language from "/svg/language.svg";
import LineMenu from "/menu.svg";
import { utilService } from "../services/util.service.js";
import FilterStay from "./FilterStay";
import MinimizedFilterStay from "./MinimizeFilterStay.jsx";

export function AppHeader({ location }) {
  console.log(location);
  return (
    <header
      className={`app-header ${location === "/" ? "full" : "compact-header"}`}
    >
      <div className="top-row">
        <NavLink to={"/"}>
          <img className="logo" src={Logo} alt="logo" />
        </NavLink>

        <div className={`center-row ${location === "/" ? "" : "hide-center"}`}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Stays
          </NavLink>
        </div>

        <div
          className={`filter-row ${
            location === "/" ? "hide-filter" : "minimized-filter"
          }`}
        >
          <MinimizedFilterStay />
        </div>

        <div className="right-row">
          <div>
            <NavLink to={"/host/homes"}>
              <button className="btn-dark">Airbnb your home</button>
            </NavLink>

            <a>
              <img className="language" src={Language}></img>
            </a>
          </div>

          <div className="side-menu">
            <img src={LineMenu}></img>
            <div className="logged-acc">
              <p>K</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`filter-row ${location === "/" ? "" : "hide-filter"}`}>
        <FilterStay />
      </div>
    </header>
  );
}
