// import { storageService } from './async-storage.service.js'
import { httpService } from '../other/http.service.js'
import { utilService } from '../other/util.service.js'
import { userService } from '../user/user.service'


const BASE_URL = 'stay/'

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
    minPricesStays,
    maxPricesStays,
    getAllPrices,
    getTotalFiltered,
    convertToServerDateFormat,
    convertFromServerDateFormat
}

window.cs = stayService


async function query(filterBy) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(stayId) {
    return httpService.get(BASE_URL + stayId)
}

async function remove(stayId) {
    return httpService.delete(BASE_URL + stayId)
}
async function save(stay) {
    var savedStay
    if (stay._id) {
        savedStay = await httpService.put(BASE_URL + stay._id, stay)
    } else {
        savedStay = await httpService.post(BASE_URL, stay)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    const savedMsg = await httpService.post(`${BASE_URL}${stayId}/msg`, { txt })
    return savedMsg
}

function getEmptyStay() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        speed: utilService.getRandomIntInclusive(1000, 9000),
    }
}



function applyFilters(stays, filterBy) {
    // Match category tags using regex
    const matchesCategoryTag = (stay) => {
        if (!filterBy.category_tag
            || !filterBy.amenities
            || !filterBy.l2_property_type_ids
            || filterBy.guest_favorite === undefined) {
            return true
        }
        return query()
    }

    if (!filterBy.startDate || !filterBy.endDate) {
        return stays
    }

    const filterStaysByExactDates = (startDateStr, endDateStr) => {
        return query({ startDateStr: startDateStr, endDateStr: endDateStr })
    }
}

function filterStaysByGuestCount(stay, guestCount) {
    return stay.capacity >= guestCount
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
    // category_tag,
    // room_types = "any_type",
    // amenities = [],
    price_min = minPricesStays(),
    price_max = maxPricesStays(),
    // l2_property_type_ids = [],
    // guest_favorite = false,
) {
    return {
        // category_tag,
        // room_types,
        price_min,
        price_max,
        // amenities,
        // l2_property_type_ids,
        // guest_favorite
    };
}

async function minPricesStays() {
    let stays = await query()
    if (!stays.length) return null;

    return Math.min(...stays.map(stay => stay.price));
}

async function maxPricesStays() {
    let stays = await query({})
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

async function getAllPrices() {
    let stays = await query({})
    return stays.map((stay) => stay.price);
}

async function getTotalFiltered(filterBy) {
    let stays = await query({})
    const total = await applyFilters(stays, filterBy).length
    return total
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