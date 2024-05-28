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

export const Amenities = {
  createHost: [
    {
      title: "",

      items: [
        { title: "Wifi", value: "Wifi", icon: "/public/assets/img/amenities/wifi.svg" },
        { title: "TV", value: "TV", icon: "/public/assets/img/amenities/tv.svg" },
        { title: "Kitchen", value: "Kitchen", icon: "/public/assets/img/amenities/kitchen.svg" },
        { title: "Washer", value: "Washer", icon: "/public/assets/img/amenities/washer.svg" },
        { title: "Free parking on premises", value: "Free parking on premises", icon: "/public/assets/img/amenities/free-parking.svg" },
        { title: "Paid parking on premises", value: "Paid parking on premises", icon: "/public/assets/img/amenities/paid-parking.svg" },
        { title: "Air conditioning", value: "Air conditioning", icon: "/public/assets/img/amenities/air-conditioning.svg" },
        { title: "Dedicated workspace", value: "Dedicated workspace", icon: "/public/assets/img/amenities/dedicated-workspace.svg" },
          
      ],
    },
    {
      title: "Do you have any standout amenities?",
      
      items: [
        { title: "Pool", value: "Pool", icon: "/public/assets/img/amenities/pool.svg" },
        { title: "Hot tub", value: "Hot tub", icon: "/public/assets/img/amenities/hot-tub.svg" },
        { title: "Patio", value: "Patio", icon: "/public/assets/img/amenities/patio.svg" },
        { title: "BBQ grill", value: "BBQ grill", icon: "/public/assets/img/amenities/bbq.svg" },
        { title: "Outdoor dining area", value: "Outdoor dining area", icon: "/public/assets/img/amenities/outdoor-dining.svg" },
        { title: "Fire pit", value: "Fire pit", icon: "/public/assets/img/amenities/fire-pit.svg" },
        { title: "Pool table", value: "Pool table", icon: "/public/assets/img/amenities/pool-table.svg" },
        { title: "Indoor fireplace", value: "Indoor fireplace", icon: "/public/assets/img/amenities/indoor-fireplace.svg" },
        { title: "Piano", value: "Piano", icon: "/public/assets/img/amenities/piano.svg" },
        { title: "Exercise equipment", value: "Exercise equipment", icon: "/public/assets/img/amenities/exercise.svg" },
        { title: "Lake access", value: "Lake access", icon: "/public/assets/img/amenities/lake-access.svg" },
        { title: "Beach access", value: "Beach access", icon: "/public/assets/img/amenities/beach-access.svg" },
        { title: "Ski-in/Ski-out", value: "Ski-in/Ski-out", icon: "/public/assets/img/amenities/ski-in-out.jpeg" },
        { title: "Outdoor shower", value: "Outdoor shower", icon: "/public/assets/img/amenities/outdoor-shower.svg" },          
      ],
    },
    {
      title: "Do you have any of these safety items?",
      
      items: [
        { title: "Smoke alarm", value: "Smoke alarm", icon: "/public/assets/img/amenities/smoke-alarm.svg" },
        { title: "First aid kit", value: "First aid kit", icon: "/public/assets/img/amenities/first-aid-kit.svg" },
        { title: "Fire extinguisher", value: "Fire extinguisher", icon: "/public/assets/img/amenities/fire-extinguisher.svg" },
        { title: "Carbon monoxide alarm", value: "Carbon monoxide alarm", icon: "/public/assets/img/amenities/carbon-monoxide-alarm.svg" },
          
      ],
    },
  ],

  filter: [
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
  ],
};
