import Logo from "../assets/svg/logo.svg";
import Language from "../assets/svg/language.svg";

import { utilService } from "../services/util.service.js";

export function AppHeader() {
  return (
    <header className="app-header">
      <img className="logo" src={Logo} alt="logo" />
      <div className="header__center">
        <h4>Search</h4>
      </div>
      <div className="header__right">
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
    </header>
  );
}
