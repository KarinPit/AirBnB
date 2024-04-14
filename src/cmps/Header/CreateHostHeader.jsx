import React from "react";
import { SmallLogo } from "../../services/svg.service";
import { NavLink } from "react-router-dom";
export default function CreateHostHeader() {
  return (
    <header className="create-host-header">
      <div className="logo">
        <SmallLogo />
      </div>
      <NavLink to={"/"} className="logo">
        <button className="create-host-exit">Exit</button>
      </NavLink>
    </header>
  );
}
