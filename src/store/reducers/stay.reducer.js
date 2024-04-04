import { stayService } from "../../services/stay.service.local";

export const SET_STAYS = "SET_STAYS";
export const ADD_STAY = "ADD_STAY";
export const UPDATE_STAY = "UPDATE_STAY";
export const REMOVE_STAY = "REMOVE_STAY";
export const SET_FILTER_BY = "SET_FILTER_BY";
export const SET_IS_LOADING = 'SET_IS_LOADING'


const initialState = {
  stays: [],
  filterBy: stayService.getDefaultFilter(),
};

export function stayReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STAYS:
      return {
        ...state,
        stays: action.stays,
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

    default:
      return state;
  }
}
