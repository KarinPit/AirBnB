import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";
import { userService } from "./user.service.js";
import { dummyStays } from "../demoData/index.js";

const STORAGE_KEY = "stay";

export const stayService = {
  query,
  getById,
  save,
  remove,
  getFilterFromParams,
  getDefaultFilter,
  sanitizeFilter,
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
  var stays = await storageService.query(STORAGE_KEY);
  if (filterBy) {
    let { category_tag } = filterBy;
    const regex = new RegExp(category_tag, "i");

    stays = stays.filter((stay) =>
      stay.labels.some((label) => regex.test(label))
    );
  }
  return stays;
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
  for (const field in defaultFilter) {
    filterBy[field] = searchParams.get(field) || defaultFilter[field];
  }
  return filterBy;
}

function getDefaultFilter() {
  return {
    category_tag: null,
  };
}

function sanitizeFilter(filterObject) {
  return Object.entries(filterObject).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null) {
      acc[key] = value;
    }
    return acc;
  }, {});
};

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
