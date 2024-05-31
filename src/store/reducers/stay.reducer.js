import { stayService } from "../../services/stay.service.local";

export const SET_STAYS = "SET_STAYS";
export const SET_STAY = "SET_STAY";
export const ADD_STAY = "ADD_STAY";
export const UPDATE_STAY = "UPDATE_STAY";
export const REMOVE_STAY = "REMOVE_STAY";
export const SET_FILTER_BY = "SET_FILTER_BY";
export const SET_IS_LOADING = "SET_IS_LOADING";
export const GET_TOTAL_STAYS_FILTERED = "GET_TOTAL_STAYS_FILTERED";


const initialState = {
  stays: [],
  stay: null,
  filterBy: stayService.getDefaultFilter(),
  isLoading: true,
  totalFiltered: 0,
};

export function stayReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STAYS:
      return {
        ...state,
        stays: action.stays,
      };
    case SET_STAY:
      return {
        ...state,
        stay: action.stay,
      };
    case ADD_STAY:
      return { ...state, stays: action.stays };

    case UPDATE_STAY:
      return {
        ...state,
        stays: state.stays.map((stay) =>
          stay.id === action.stay.id ? action.stay : stay
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
        totalFiltered: action.total,
      };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }

    default:
      return state;
  }
}
