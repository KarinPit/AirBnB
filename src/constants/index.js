import { GuestFavoritesIcon } from "../services/svg.service";

export const RoomTypes = [
  {
    key: "1",
    name: "any_type",
    label: "Any type",
  },
  {
    key: "2",
    name: "room",
    label: "Room",
  },
  {
    key: "3",
    name: "enitre_home",
    label: "Entire home",
  },
];
export const RoomsAndBeds = [
  { key: "0", label: "Any" },
  { key: "1", label: 1 },
  { key: "2", label: 2 },
  { key: "3", label: 3 },
  { key: "4", label: 4 },
  { key: "5", label: 5 },
  { key: "6", label: 6 },
  { key: "7", label: 7 },
  { key: "8", label: "8+" },
];
export const TopTierStays = [
  {
    key: "1",
    title: "Guest favorites",
    info: "The most loved homes on Airbnb, according to guests",
    icon: GuestFavoritesIcon,
  },
];

export const PropertyType = [
  {
    key: "1",
    title: "house",
    icon: "/public/assets/img/advanced-filter/house.jpeg",
  },
  {
    key: "2",
    title: "guesthouse",
    icon: "/public/assets/img/advanced-filter/guest-house.jpeg",
  },
  {
    key: "3",
    title: "hotel",
    icon: "/public/assets/img/advanced-filter/hotel.jpeg",
  },
];

export const Amenities = [
  {
    category: "Essentials",

    items: [
      "Wifi",
      "Kitchen",
      "Washer",
      "Dryer",
      "Air conditioning",
      "Heating",
      "Dedicated workspace",
      "TV",
      "Hair dryer",
      "Iron",
    ],
  },
  {
    category: "Features",

    items: [
      "Pool",
      "Hot tub",
      "Free parking",
      "EV charger",
      "Crib",
      "King bed",
      "Gym",
      "BBQ grill",
      "Breakfast",
      "Indoor fireplace",
      "Smoking allowed",
    ],
  },
  {
    category: "Safety",

    items: ["Smoke alarm", "Carbon monoxide alarm"],
  },
];
