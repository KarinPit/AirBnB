import { format } from "date-fns";

export const guestPickerData = [
  { label: "Adults", type: "adults" },
  { label: "Children", type: "children" },
  { label: "Infants", type: "infants" },
  { label: "Pets", type: "pets" },
];

export const filterStayInfo = [
  {
    label: "Where",
    description: "Search destinations",
    value: "query",
    isSearch: true,
  },
  {
    label: "Check in",
    description: "Add dates",
    value: "checkIn",
  },
  {
    label: "Check out",
    description: "Add dates",
    value: "checkOut",
  },
  {
    label: "Who",
    description: "Add guests",
    value: "guestCounts",
  },
];

export const regions = [
  { name: "Asia", imageName: "/img/locations/asia.png" },
  { name: "Europe", imageName: "/img/locations/europe.png" },
  { name: "Greece", imageName: "/img/locations/greece.png" },
  { name: "Italy", imageName: "/img/locations/italy.png" },
  { name: "Flexible", imageName: "/img/locations/search-flexible.png" },
  { name: "United States", imageName: "/img/locations/united-state.png" },
];

export const getFilterValue = (filter, currentOrderDebug) => {
  if (!currentOrderDebug) return "";

  if (filter.value === "checkIn") {
    const startDate = currentOrderDebug?.range?.start;
    return startDate ? format(startDate, "MMM dd, yyyy") : "";
  }

  if (filter.value === "checkOut") {
    const endDate = currentOrderDebug?.range?.end;
    return endDate ? format(endDate, "MMM dd, yyyy") : "";
  }
  if (filter.value === "guestCounts") {
    const guests = currentOrderDebug.guests || {};
    const adults = guests.adults || 0;
    const children = guests.children || 0;
    const infants = guests.infants || 0;
    const pets = guests.pets || 0;
    const totalGuests = adults + children;
  
    if (totalGuests === 0 && infants === 0 && pets === 0) {
      return "Add guests";
    }
  
    return `${totalGuests} Guests, ${infants} Infants, ${pets} Pets`;
  }
  return currentOrderDebug[filter.value] || "";
};