import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";
import { userService } from "./user.service.js";
import { dummyStays } from "../demoData/index.js";

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
_createStays();
async function query(filterBy) {
  let stays = await storageService.query(STORAGE_KEY);
  if (filterBy) {
    stays = applyFilters(stays, filterBy);
  }
  return stays;
}

function applyFilters(stays, filterBy) {
  return stays.filter((stay) => {
    // Category tag filter
    // const categoryTagMatch =
    //   !filterBy.category_tag ||
    //   stay.labels.some((label) =>
    //     new RegExp(filterBy.category_tag, "i").test(label)
    //   );

    // Amenities filter
    const amenitiesMatch =
      !filterBy.amenities ||
      filterBy.amenities.every((amenity) => stay.amenities.includes(amenity));

    // Property type filter
    const propertyTypeMatch =
      !filterBy.l2_property_type_ids ||
      filterBy.l2_property_type_ids.every((property) => stay.type === property);

    // Price range filter
    const priceMinMatch =
      filterBy.price_min === undefined || stay.price >= filterBy.price_min;
    const priceMaxMatch =
      filterBy.price_max === undefined || stay.price <= filterBy.price_max;
    const priceMatch = priceMinMatch && priceMaxMatch;

    // Combine all filter checks
    return (
      // categoryTagMatch &&
      amenitiesMatch && 
      priceMatch
      // categoryTagMatch && amenitiesMatch && propertyTypeMatch && priceMatch
    );
  });
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
    stay.owner = userService.getLoggedinUser();
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
  price_min,
  price_max
) {
  return {
    category_tag,
    room_types,
    price_min,
    price_max,
    amenities,
  };
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
