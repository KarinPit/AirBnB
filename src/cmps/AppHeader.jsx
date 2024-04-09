import { NavLink, useLocation } from "react-router-dom";

import Logo from "/svg/logo.svg";
import Language from "/svg/language.svg";

import { utilService } from "../services/util.service.js";
import FilterStay from "./FilterStay";


export function AppHeader({ location }) {
  return (
    <header className={`app-header ${location === '/' ? 'full' : 'compact-header'}`}>
      <div className="top-row">
        <NavLink to={"/"}>
          <img className="logo" src={Logo} alt="logo" />
        </NavLink>

        <div className={`center-row ${location === '/' ? '' : 'hide-center'}`}>
          <NavLink to="/stay" className={({ isActive }) => isActive ? 'active-link' : ''}>Stays</NavLink>
          <NavLink to="/experience" className={({ isActive }) => isActive ? 'active-link' : ''}>Experiences</NavLink>
          <NavLink to="/online-experience" className={({ isActive }) => isActive ? 'active-link' : ''}>Online Experiences</NavLink>
        </div>

        <div className={`filter-row ${location === '/' ? 'hide-filter' : 'minimized-filter'}`}>
          <FilterStay />
        </div>

        <div className="right-row">
          <a>
            <button className="btn-dark">Airbnb your home</button>
          </a>

          <div>
            <img src={Language}></img>
          </div>

          <div>
            <h5>Account</h5>
          </div>
        </div>
      </div>

      <div className={`filter-row ${location === '/' ? '' : 'hide-filter'}`}>
        <FilterStay />
      </div>
    </header >
  )
}