import { Link, useLocation } from "react-router-dom"

import { utilService } from "../services/util.service.js";
import FilterStay from "./FilterStay"

import "../assets/styles/main.scss"
import Logo from "/svg/logo.svg"
import Language from "/svg/language.svg"


export function AppHeader({ location }) {
  return (
    <header className={`app-header ${location === '/' ? 'full' : 'compact-header'}`}>
      <div className="top-row">
        <Link to={"/"}>
          <img className="logo" src={Logo} alt="logo" />
        </Link>

        <div className={`center-row ${location === '/' ? '' : 'hide-center'}`}>
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
    </header>
  )
}
