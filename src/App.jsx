import React from "react";
import { Routes, Route } from "react-router";
import { useLocation } from "react-router-dom"

import routes from "./routes";

import { AppHeader } from "./cmps/AppHeader";
import { AppFooter } from "./cmps/AppFooter";

export function RootCmp() {
  const location = useLocation().pathname

  return (
    <div className={`main-layout ${location === '/' ? '' : 'compact-layout'}`}>
      <AppHeader location={location} />
      <main className={`${location === '/' ? 'full' : ''}`}>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              exact={true}
              element={route.component}
              path={route.path}
            />
          ))}
        </Routes>
      </main>
      <AppFooter location={location}/>
    </div>
  );
}
