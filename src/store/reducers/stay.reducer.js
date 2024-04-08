import { stayService } from "../../services/stay.service.local";

export const SET_STAYS = "SET_STAYS";
export const ADD_STAY = "ADD_STAY";
export const UPDATE_STAY = "UPDATE_STAY";
export const REMOVE_STAY = "REMOVE_STAY";
export const SET_FILTER_BY = "SET_FILTER_BY";
export const SET_IS_LOADING = "SET_IS_LOADING";
export const GET_TOTAL_STAYS_FILTERED = "GET_TOTAL_STAYS_FILTERED";
export const MIN_PRICES = "MIN_PRICES";
export const MAX_PRICES = "MAX_PRICES";

const initialState = {
  stays: [],
  filterBy: stayService.getDefaultFilter(),
  totalFiltered: 0,
  min: 0,
  max: 0,
};

export function stayReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STAYS:
      return {
        ...state,
        stays: action.stays,
        min:Math.min(...action.stays.map((stay) => stay.price)),
        max:Math.max(...action.stays.map((stay) => stay.price))
      };
    case ADD_STAY:
      return { ...state, stays: action.stays };

    case UPDATE_STAY:
      return {
        ...state,
        stays: state.stays.map((stay) =>
          robot.id === action.stay.id ? action.stay : stay
        ),
      };

    case REMOVE_STAY:
      return {
        ...state,
        stays: state.stays.filter((stay) => stay._id !== action.stayId),
      };
    case SET_FILTER_BY:
      return {
        ...state,
        filterBy: { ...state.filterBy, ...action.fieldsToUpdate },
      };
    case GET_TOTAL_STAYS_FILTERED:
      return {
        ...state,
        totalFiltered: action.filters.length,
      };
    // case MIN_PRICES:
    //   return {
    //     ...state,
    //     min: action.min,
    //   };
    // case MAX_PRICES:
    //   return {
    //     ...state,
    //     max: action.max,
    //   };

    default:
      return state;
  }
}
