import { HomePage } from "./pages/HomePage.jsx";
import { StayIndex } from "./pages/StayIndex.jsx";
import { StayDetails } from "./pages/StayDetails.jsx";
import { ExperienceIndex } from "./pages/ExperienceIndex.jsx";
import { OnlineExperienceIndex } from "./pages/OnlineExperienceIndex.jsx";
import { ContactRenterPage } from "./pages/ContactRenterPage.jsx";
import { HomePageClient } from "./pages/HomePageClient.jsx";
import { HomePageRenter } from "./pages/HomePageRenter.jsx";
import { OrderRequestPage } from "./pages/OrderRequestPage.jsx";

const routes = [
  {
    path: "/",
    component: <HomePage />,
  },
  {
    path: "stay",
    component: <StayIndex />,
    label: "Stays",
  },
  {
    path: "stay/:stayId",
    component: <StayDetails />,
  },
  {
    path: "experience",
    component: <ExperienceIndex />,
    label: "Experiences",
  },
  {
    path: "online-experience",
    component: <OnlineExperienceIndex />,
    label: "Online Experiences",
  },
  {
    path: "contact-renter",
    component: <ContactRenterPage />,
  },
  {
    path: "home-client",
    component: <HomePageClient />,
  },
  {
    path: "home-renter",
    component: <HomePageRenter />,
  },
  {
    path: "order-request",
    component: <OrderRequestPage />,
  },
];

export default routes;
