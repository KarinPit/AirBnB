import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import Logo from "/svg/logo.svg";
import Language from "/svg/language.svg";

import FilterStay from "./FilterStay.jsx";
import { changeUserType } from "../store/actions/system.actions.js";
import { useSelector } from "react-redux";

export function AppHeader() {
  const userType = useSelector(
    (storeState) => storeState.systemModule.userType
  );

  const location = useLocation();
  function onChangeUserType() {
    changeUserType(userType === "RENTER" ? "STAYER" : "RENTER");
  }
  function renderMainHeader() {
    return (
      <>
        <div className="top-row">
          {/* <NavLink> */}
          <img className="logo" src={Logo} alt="Airbnb Logo" />
          {/* </NavLink> */}

          {userType === "STAYER" && (
            <div
              className={`center-row ${
                location.pathname === "/" ? "" : "hide-center"
              }`}
            >
              <NavLink to="/">Stays</NavLink>
              <NavLink to="/experience">Experiences</NavLink>
              <NavLink to="/online-experience">Online Experiences</NavLink>
            </div>
          )}

          {userType === "STAYER" && (
            <div
              className={`filter-row ${
                location.pathname === "/" ? "hide-filter" : "minimized-filter"
              }`}
            >
              <FilterStay />
            </div>
          )}

          <div className="right-row">
            <NavLink to={userType === "STAYER" ? "/" : "/host/homes"}>
              <button onClick={onChangeUserType} className="btn-dark">
                Airbnb your home
              </button>
            </NavLink>

            <img src={Language} alt="Language" />

            <h5>Account</h5>
          </div>
        </div>

        <div
          className={`filter-row ${
            location.pathname === "/" ? "" : "hide-filter"
          }`}
        >
          <FilterStay />
        </div>
      </>
    );
  }

  function renderChildHeader() {
    return <></>;
  }
  return (
    <header className={`app-header`}>
      {renderMainHeader()}
      {/* {isMain ? renderMainHeader() : renderChildHeader()} */}
    </header>
  );
}
