import CreateHostHeader from "../cmps/Header/CreateHostHeader";
import RenterHeader from "../cmps/Header/RenterHeader";
import React from "react";
import { Outlet } from "react-router";

export function CreateHostLayout() {
  return (
    <div>
      {/* <CreateHostHeader /> */}
      <Outlet />
      {/* <AppFooter /> */}
    </div>
  );
}
