import React from "react";
import { NavLink } from "react-router-dom";

import FilterStay from "../../cmps/Header/FilterStay";
import Logo from "/svg/logo.svg";
import Language from "/svg/language.svg";

export default function StayerHeader() {
  return (
    <div className="app-header">
      <div className="app-header-navigation">
        <NavLink className="logo" to={"/"}>
          <img src={Logo} alt="Airbnb Logo" />
        </NavLink>

        <div className="tabs">
          <NavLink to="/">Stays</NavLink>
          <NavLink to="/experience">Experiences</NavLink>
          <NavLink to="/online-experience">Online Experiences</NavLink>
        </div>

        <div className="menus">
          <NavLink to={"/host/homes"}>
            <button className="btn-dark">Airbnb your home</button>
          </NavLink>

          <img src={Language} alt="Language" />

          <h5>Account</h5>
        </div>
      </div>
      <FilterStay />
    </div>
  );
}
