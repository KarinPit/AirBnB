import { ContactRenterIndex } from "./pages/ContactRenterIndex";
import { ExperienceIndex } from "./pages/ExperienceIndex";
import { OnlineExperienceIndex } from "./pages/OnlineExperienceIndex";
import { OrderIndex } from "./pages/OrderIndex";
import { ProfileIndex } from "./pages/ProfileIndex";
import { RenterIndex } from "./pages/RenterIndex";
import { TravelerIndex } from "./pages/TravelerIndex";
import { StayDetails } from "./pages/StayDetails";
import { StayIndex } from "./pages/StaysIndex";

const routes = [
  {
    path: "/",
    component: <StayIndex />,
  },
  {
    path: "stay",
    component: <StayDetails />,
    label: "Stays",
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
    path: "profile",
    component: <ProfileIndex />,
  },
  {
    path: "order",
    component: <OrderIndex />,
  },
  {
    path: "contact-renter",
    component: <ContactRenterIndex />,
  },
  {
    path: "renter-home",
    component: <RenterIndex />,
  },
];

export default routes;
