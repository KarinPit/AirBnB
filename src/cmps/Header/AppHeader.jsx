import { useState, useEffect, useRef } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useSelector } from 'react-redux'

import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service.js'
import { login, logout, signup } from '../../store/actions/user.actions.js'
import { LoginSignup } from './LoginSignup.jsx'
import { utilService } from "../../services/util.service.js"
import FilterStay from "./FilterStay.jsx"
import MinimizedFilterStay from "./MinimizeFilterStay.jsx"

import Logo from "/svg/logo.svg"
import Language from "/svg/language.svg"
import LineMenu from "/svg/menu.svg"
import ProfileIcon from "/svg/profile.svg"

export function AppHeader({ location }) {
  const [showAccMenu, setshowAccMenu] = useState(false)
  const user = useSelector(storeState => storeState.userModule.user)
  const menuRef = useRef(null)
  const accMenuRef = useRef(null)


  async function onLogin(credentials) {
    try {
      const user = await login(credentials)
      showSuccessMsg(`Welcome: ${user.fullname}`)
    } catch (err) {
      showErrorMsg('Cannot login')
    }
  }
  async function onSignup(credentials) {
    try {
      const user = await signup(credentials)
      showSuccessMsg(`Welcome new user: ${user.fullname}`)
    } catch (err) {
      showErrorMsg('Cannot signup')
    }
  }
  async function onLogout() {
    try {
      await logout()
      showSuccessMsg(`Bye now`)
    } catch (err) {
      showErrorMsg('Cannot logout')
    }
  }

  function handleClick(event) {
    if (accMenuRef.current && accMenuRef.current.contains(event.target)) {
      setshowAccMenu(true)
    }
    else if (menuRef.current.contains(event.target)) {
      setshowAccMenu(prev => !prev)
    }
    else {
      setshowAccMenu(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClick)
    return () => {
      document.removeEventListener("mousedown", handleClick)
    }
  }, [menuRef, accMenuRef])

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
          className={`filter-row ${location === "/" ? "hide-filter" : "minimized-filter"
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

      <div className={`filter-row ${location === "/" ? "" : "hide-filter"}`}>
        <FilterStay />
      </div>
    </header>
  )
}
