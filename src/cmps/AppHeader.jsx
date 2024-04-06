import { Link } from "react-router-dom";

import Logo from "../assets/svg/logo.svg";
import Language from "../assets/svg/language.svg";

import { utilService } from "../services/util.service.js";

export function AppHeader() {
    return (
        <header className="app-header full">
            <Link to={'/'}><img className="logo" src={Logo} alt="logo" /></Link>

            <div className="header__center">
                <Link to={'/stay'}><button>Stays</button></Link>
                <Link to={'/experience'}><button>Experiences</button></Link>
                <Link to={'/online-experience'}><button>Online Experiences</button></Link>
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
