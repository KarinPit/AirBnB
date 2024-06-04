import React, { Children, Fragment, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthGuard } from "./guards/AuthGuard";
import MainStayerLayout from "./layouts/MainStayerLayout";
import MainRenterLayout from "./layouts/MainRenterLayout";
import { CreateHostLayout } from "./layouts/CreateHostLayout";
import BookOrderLayout from "./layouts/BookOrderLayout";


const OrderIndex = React.lazy(() => import("./pages/OrderIndex"));
const OrderPage = React.lazy(() => import("./pages/OrderPage"));
const StaysIndex = React.lazy(() => import("./pages/StaysIndex"));
const StayIndex = React.lazy(() => import("./pages/StayIndex"));
const RenterIndex = React.lazy(() => import("./pages/RenterIndex"));
const BuyerIndex = React.lazy(() => import("./pages/TravelerIndex"));
const CreateHostIndex = React.lazy(() => import("./pages/CreateHostIndex"));

const routes = [
  {
    path: "/",
    element: <MainStayerLayout />,
    guard: AuthGuard,
    children: [
      {
        key: "stay-index",
        index: true,
        element: <StaysIndex />,
      },
      {
        key: "stay-id",
        path: "/stay/:stayId",
        element: <StayIndex />,
      },
    ],
    key: "home",
  },
  {
    path: "/profile",
    element: <MainStayerLayout />,
    children: [
      {
        key: "renter-profile",
        path: "renter/:renterId",
        element: <RenterIndex />
      },
      {
        key: "buyer-profile",
        path: "buyer/:buyerId",
        element: <BuyerIndex />
      }
    ],
    key: "profile",
  },
  {
    path: "/host",
    element: <CreateHostLayout />,
    children: [
      {
        key: "homes",

        path: "homes",
        element: <CreateHostIndex />,
      },
    ],
    key: "renter",
  },
  {
    path: "/become-a-host",
    element: <CreateHostLayout />,
    children: [
      {
        key: "create-host",

        index: true,
        element: <CreateHostIndex />,
      },
    ],
    key: "become-host",
  },
  {
    path: "/order/:stayId",
    element: <BookOrderLayout />,
    children: [
      {
        key: "order-index",
        index: true,
        element: <OrderPage />,
      },      
      {
        key: "order-id",
        path: ":stayId/order",
        element: <OrderIndex />,
      },
    ],
    key: "order",
  },
  { path: "*", element: <Navigate to="/" replace />, key: "404" },
];

export const createRouting = () => {
  return (
    <Suspense fallback={''}>
      <Routes>
        {routes.map((route) => {
          const Guard = route.guard || Fragment;
          const renderRoute = (currentRoute) => (
            <Route
              index={currentRoute.index}
              key={currentRoute.key}
              path={currentRoute.path}
              element={<Guard>{currentRoute.element}</Guard>}
            >
              {currentRoute.children &&
                currentRoute.children.map((childRoute) =>
                  renderRoute(childRoute)
                )}
            </Route>
          );

          return renderRoute(route);
        })}
      </Routes>
    </Suspense>
  );
};
