import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service.js';
import { login, logout, signup } from '../../store/actions/user.actions.js';
import { LoginSignup } from './LoginSignup.jsx';
import FilterStay from "./FilterStay.jsx";
import MinimizedFilterStay from "./MinimizeFilterStay.jsx";

import Logo from "/svg/logo.svg";
import Language from "/svg/language.svg";
import LineMenu from "/svg/menu.svg";
import ProfileIcon from "/svg/profile.svg";
import PropTypes from 'prop-types';
import Skeleton from "react-loading-skeleton";


export function AppHeader({ location }) {
  const [showAccMenu, setshowAccMenu] = useState(false);
  const [headerSize, setHeaderSize] = useState('normal');
  const [showFilter, setShowFilter] = useState("");
  const [showRow, setShowRow] = useState("");
  const [showMinimized, setShowMinimized] = useState(false);
  const user = useSelector(storeState => storeState.userModule.user);
  const isLoading = useSelector(storeState => storeState.stayModule.isLoading);

  const menuRef = useRef(null);
  const accMenuRef = useRef(null);
  // const location = useLocation();

  AppHeader.propTypes = {
    location: PropTypes.string.isRequired,
  };
  let locationProp = location;
  let locationBool = locationProp.includes('/order/');

  const visibility = () => {
    switch (true) {
      case location === ('/'):
        // console.log('full');
        setHeaderSize('full');
        setShowFilter("");
        setShowRow("");
        setShowMinimized("hide-filter");
        break;
      case locationProp.includes('/order/'):
        setHeaderSize('compact-header');
        setShowFilter("hide-filter");
        setShowRow("hide-filter");
        setShowMinimized("hide-filter");
        break;
      case locationProp.includes('/profile/'):
        setHeaderSize('compact-header');
        setShowFilter("hide-filter");
        setShowRow("");
        break;
      case locationProp.includes('/stay/'):
        setHeaderSize('compact-header');
        setShowFilter("hide-filter");
        setShowRow("");
        setShowMinimized("");
        break;
      default:
    }
  }

  useEffect(() => {
    // determineVisibility();
    visibility();
  }, [location]);

  async function onLogin(credentials) {
    try {
      const user = await login(credentials);
      showSuccessMsg(`Welcome: ${user.fullname}`);
    } catch (err) {
      showErrorMsg('Cannot login');
    }
  }

  async function onSignup(credentials) {
    try {
      const user = await signup(credentials);
      showSuccessMsg(`Welcome new user: ${user.fullname}`);
    } catch (err) {
      showErrorMsg('Cannot signup');
    }
  }

  async function onLogout() {
    try {
      await logout();
      showSuccessMsg(`Bye now`);
    } catch (err) {
      showErrorMsg('Cannot logout');
    }
  }

  function handleClick(event) {
    if (accMenuRef.current && accMenuRef.current.contains(event.target)) {
      setshowAccMenu(true);
    } else if (menuRef.current.contains(event.target)) {
      setshowAccMenu(prev => !prev);
    } else {
      setshowAccMenu(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [menuRef, accMenuRef]);

  return (
    <header className={`app-header ${headerSize}`}>
      <div className="top-row">
        <NavLink to={"/"}>
          <img className="logo" src={Logo} alt="logo" />
        </NavLink>

        <div className={`center-row ${location === "/" ? "" : "hide-center"}`}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            {!isLoading ? 'Stays' : <Skeleton width={60} height={25}/>}
          </NavLink>
        </div>

        {showMinimized ? <div
          className={`filter-row ${showMinimized}`}
        >
          <MinimizedFilterStay />
        </div>
          : ''}


        <div className={`right-row ${showRow}`}>
          <div>
            <NavLink to={"/host/homes"}>
              <button className="btn-dark">Airbnb your home</button>
            </NavLink>

            <a>
              <img className="language" src={Language}></img>
            </a>
          </div>

          <div className="side-menu" ref={menuRef}>
            <img src={LineMenu}></img>

            <div className="logged-acc">
              {!user &&
                <img src={ProfileIcon}></img>
              }

              {user &&
                <p>{user.fullname[0]}</p>
              }

              {!user && showAccMenu &&
                <div className="acc-modal" ref={accMenuRef}>
                  <div className="user-options">
                    <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                  </div>
                  <div className="extra-options">
                    <button>Airbnb your home</button>
                  </div>
                </div>
              }

              {user && showAccMenu &&
                <div className="acc-modal" ref={accMenuRef}>
                  <div className="user-options">
                    <NavLink to={`/profile/buyer/${user._id}`}>
                      <button>Account</button>
                    </NavLink>
                  </div>
                  <div className="extra-options">
                    <button>Airbnb your home</button>
                    <button onClick={onLogout}>Logout</button>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      <div className={`filter-row ${showFilter}`}>
        <FilterStay />
      </div>
    </header>
  );
}
