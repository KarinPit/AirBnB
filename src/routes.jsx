import { ContactRenterIndex } from "./pages/ContactRenterIndex";
import { ExperienceIndex } from "./pages/ExperienceIndex";
import { OnlineExperienceIndex } from "./pages/OnlineExperienceIndex";
import { OrderIndex } from "./pages/OrderIndex";
import { ProfileIndex } from "./pages/ProfileIndex";
import { RenterIndex } from "./pages/RenterIndex";
import { StayIndex } from "./pages/StayIndex";
import { StaysIndex } from "./pages/StaysIndex";

const routes = [
  {
    path: "/",
    component: <StaysIndex />,
    label: "Stays"
  },
  {
    path: "/:stayId",
    component: <StayIndex />,
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
