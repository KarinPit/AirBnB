import { Link } from "react-router-dom";

import Logo from "/svg/logo.svg";
import Language from "/svg/language.svg";

import { utilService } from "../services/util.service.js";
import FilterStay from "./FilterStay";

import "../assets/styles/main.scss"

export function AppHeader() {
  return (
    <header className="app-header full">
      <div className="top-row">
        <Link to={"/"}>
          <img className="logo" src={Logo} alt="logo" />
        </Link>

        <div className="center-row">
          <Link to={"/stay"}>
            <button>Stays</button>
          </Link>
          <Link to={"/experience"}>
            <button>Experiences</button>
          </Link>
          <Link to={"/online-experience"}>
            <button>Online Experiences</button>
          </Link>
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
