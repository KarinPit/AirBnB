import { storageService } from "../other/async-storage.service.js";
import { utilService } from "../other/util.service.js";
import { userService } from "../user/user.service.js";
import { dummyStays } from "../../demoData/index.js"

const STORAGE_KEY = "stay";

export const stayService = {
  query,
  applyFilters,
  getById,
  save,
  remove,
  getFilterFromParams,
  getDefaultFilter,
  sanitizeFilter,
  countChangedFilters,
  addstayMsg,
  minPricesStays,
  maxPricesStays,
  getAllPrices,
  getTotalFiltered,
  convertToServerDateFormat,
  convertFromServerDateFormat
};
window.cs = stayService;

/*
TO DO: 

1. Change the query function filter to filter by userID
  // Example - figuring up if the user is an owner:
  // userService.login()
    //  const userStays = stayService.query({ownerId: loggeinUser._id})
    //  loggeinUser.isOwner = userStays.length > 0



*/
_createStays()

async function query(filterBy) {
  let stays = await storageService.query(STORAGE_KEY); //storage access
  if (filterBy) {
    stays = applyFilters(stays, filterBy);
  }
  return stays;
}

function applyFilters(stays, filterBy) {

  // Match category tags using regex
  const matchesCategoryTag = (stay) => {
    if (!filterBy.category_tag) {
      return true;
    }
    const regex = new RegExp(filterBy.category_tag, "i");
    return stay.labels.some((label) => regex.test(label));
  };

  // Match amenities through direct inclusion
  const matchesAmenities = (stay) => {
    if (!filterBy.amenities) return true;
    return filterBy.amenities.every((amenity) =>
      stay.amenities.includes(amenity)
    );
  };

  // Match property types using regex
  const matchesPropertyType = (stay) => {
    if (!filterBy.l2_property_type_ids) return true;
    // Assuming the IDs do not contain special regex characters
    const pattern = filterBy.l2_property_type_ids.join("|");
    const regex = new RegExp(pattern, "i");
    return regex.test(stay.type);
  };

  // Determine if stay is within the specified price range
  const withinPriceRange = (stay) => {
    const priceMinMatch =
      !filterBy.price_min || stay.price >= filterBy.price_min;
    const priceMaxMatch =
      !filterBy.price_max || stay.price <= filterBy.price_max;
    return priceMinMatch && priceMaxMatch;
  };
  // Determine if stay is within the specified guest favorite
  const matchGuestFavorites = (stay) => {
    if (filterBy.guest_favorite === undefined) return true;

    if (filterBy.guest_favorite === true) {
      return stay.guest_favorite === true;
    }

    return true;
  };

  if (!filterBy.startDate || !filterBy.endDate) {
    return stays; // Return all stays if no date filter is set
  }
  const filterStaysByExactDates = (stays, startDateStr, endDateStr) => {
    // if stays dont have filterd yet , return all stays

    return stays.availabilityPeriods.some(period => {
      const matchesStartDate = period.startDate === startDateStr;
      const matchesEndDate = period.endDate === endDateStr;
      return matchesStartDate && matchesEndDate;
    });
  };
  const isWithinGuestLimit = (stay) => {
    return filterBy.guestCount ? filterStaysByGuestCount(stay, filterBy.guestCount) : true;
  };
  return stays.filter(
    (stay) =>
      matchesCategoryTag(stay) &&
      matchesAmenities(stay) &&
      withinPriceRange(stay) &&
      matchesPropertyType(stay) &&
      matchGuestFavorites(stay) &&
      filterStaysByExactDates(stay, filterBy.startDate, filterBy.endDate)
    // isWithinGuestLimit(stay)
  );
}
function filterStaysByGuestCount(stay, guestCount) {
  return stay.capacity >= guestCount;
}

function getById(stayId) {
  return storageService.get(STORAGE_KEY, stayId);
}

async function remove(stayId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, stayId);
}

async function save(stay) {
  var savedstay;
  if (stay._id) {
    savedstay = await storageService.put(STORAGE_KEY, stay);
  } else {
    // Later, owner is set by the backend
    // stay.owner = userService.getLoggedinUser();
    savedstay = await storageService.post(STORAGE_KEY, stay);
  }
  return savedstay;
}

function getFilterFromParams(searchParams) {
  const defaultFilter = getDefaultFilter();
  const filterBy = {};

  Object.entries(defaultFilter).forEach(([field, defaultValue]) => {
    const isFieldArray = Array.isArray(defaultValue);
    let value = isFieldArray
      ? searchParams.getAll(field)
      : searchParams.get(field);

    if (value === null || (isFieldArray && value.length === 0)) {
      filterBy[field] = defaultValue;
    } else if (typeof defaultValue === "number") {
      value = Number(value);
      filterBy[field] = isNaN(value) ? defaultValue : value;
    } else if (isFieldArray && typeof defaultValue[0] === "number") {
      filterBy[field] = value.map((val) => {
        const numVal = Number(val);
        return isNaN(numVal) ? val : numVal;
      });
    } else {
      filterBy[field] = value;
    }
  });
  return filterBy;
}

function getDefaultFilter(
  category_tag,
  room_types = "any_type",
  amenities = [],
  price_min = minPricesStays(),
  price_max = maxPricesStays(),
  l2_property_type_ids = [],
  guest_favorite = false,
) {
  return {
    category_tag,
    room_types,
    price_min,
    price_max,
    amenities,
    l2_property_type_ids,
    guest_favorite
  };
}

function minPricesStays() {
  let stays = utilService.loadFromStorage(STORAGE_KEY) || [];
  if (!stays.length) return null;

  return Math.min(...stays.map(stay => stay.price));
}

function maxPricesStays() {
  let stays = utilService.loadFromStorage(STORAGE_KEY);
  return Math.max(...stays.map((stay) => stay.price));
}

function sanitizeFilter(filterObject) {
  return Object.entries(filterObject).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null) {
      acc[key] = value;
    }
    return acc;
  }, {});
}

function countChangedFilters(currentFilters, initialFilters) {
  return Object.keys(currentFilters).reduce((count, key) => {
    const currentValue = currentFilters[key];
    const initialValue = initialFilters[key];

    // For arrays, compare lengths and contents
    if (Array.isArray(currentValue) && Array.isArray(initialValue)) {
      const isDifferent =
        currentValue.length !== initialValue.length ||
        currentValue.some((val, index) => val !== initialValue[index]);
      return count + (isDifferent ? 1 : 0);
    }

    return count + (currentValue !== initialValue ? 1 : 0);
  }, 0);
}

function getAllPrices() {
  let stays = utilService.loadFromStorage(STORAGE_KEY);
  return stays.map((stay) => stay.price);
}

async function getTotalFiltered(filterBy) {
  let stays = utilService.loadFromStorage(STORAGE_KEY);
  const total = await applyFilters(stays, filterBy).length
  return total
}

async function addstayMsg(stayId, txt) {
  const stay = await getById(stayId);
  if (!stay.msgs) stay.msgs = [];

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt,
  };
  stay.msgs.push(msg);
  await storageService.put(STORAGE_KEY, stay);

  return msg;
}

function _createStays() {
  let stays = utilService.loadFromStorage(STORAGE_KEY);
  if (!stays || !stays.length) {
    stays = dummyStays;
    utilService.saveToStorage(STORAGE_KEY, stays);
  }
}

export function convertToServerDateFormat(date) {
  return [
    date.getDate().toString().padStart(2, '0'),
    (date.getMonth() + 1).toString().padStart(2, '0'),
    date.getFullYear(),
  ].join('/');
}

export function convertFromServerDateFormat(dateStr) {
  // Converts DD/MM/YYYY to JavaScript Date object
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    // Note: Month is 0-indexed in JavaScript Date
    return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
  }
  return null;
}