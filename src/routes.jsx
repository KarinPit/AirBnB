import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ContactRenterIndex } from "./pages/ContactRenterIndex";
import { ExperienceIndex } from "./pages/ExperienceIndex";
import { OnlineExperienceIndex } from "./pages/OnlineExperienceIndex";
import { OrderIndex } from "./pages/OrderIndex";
import { ProfileIndex } from "./pages/ProfileIndex";
import { StaysIndex } from "./pages/StaysIndex";
import MainLayout from "./layouts/MainLayout";
import StayIndex from "./pages/StayIndex";
import RenterIndex from "./pages/RenterIndex";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <StaysIndex />,
      },
      {
        path: "/stay/:stayId", // Assuming you have a route for individual stays
        element: <StayIndex />,
      },
    ],
  },
  {
    path: "/host",
    element: <MainLayout />,
    children: [
      {
        path: "homes",
        element: <RenterIndex />,
      },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
];

export const createRouting = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element}>
          {route.children &&
            route.children.map((childRoute, childIndex) => (
              <Route
                key={childIndex}
                path={childRoute.path}
                element={childRoute.element}
              />
            ))}
        </Route>
      ))}
    </Routes>
  </Suspense>
);
