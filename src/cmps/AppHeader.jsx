import { NavLink } from "react-router-dom";


import Logo from "/svg/logo.svg";
import Language from "/svg/language.svg";

import { utilService } from "../services/util.service.js";
import FilterStay from "./FilterStay";

import "../assets/styles/main.scss"

export function AppHeader() {
  return (
    <header className="app-header full">
      <div className="top-row">
        <NavLink to={"/"}>
          <img className="logo" src={Logo} alt="logo" />
        </NavLink>

        <div className="center-row">
          <NavLink to="/stay" className={({ isActive }) => isActive ? 'active-link' : ''}>Stays</NavLink>
          <NavLink to="/experience" className={({ isActive }) => isActive ? 'active-link' : ''}>Experiences</NavLink>
          <NavLink to="/online-experience" className={({ isActive }) => isActive ? 'active-link' : ''}>Online Experiences</NavLink>
        </div>

        <div className="header-right">
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

      <div className="filter-row">
        <FilterStay />
      </div>
    </header>
  )
}
