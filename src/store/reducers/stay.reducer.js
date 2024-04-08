import demoData from "../../demoData/index"

export const SET_STAYS = "SET_STAYS";
export const SET_STAY = "SET_STAY";
export const REMOVE_STAY = "REMOVE_STAY";

const initialState = {
  stays: [demoData],
};

export function stayReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STAYS:
      return { ...state, stays: action.stays };

    case SET_STAY:
      const exists = state.stays.find((stay) => stay._id === action.stay._id);
      let updatedStays = [];
      if (exists) {
        updatedStays = state.stays.map((stay) =>
          stay._id === action.stay._id ? action.stay : stay
        );
      } else {
        updatedStays = [...state.stays, action.stay];
      }
      return { ...state, stays: updatedStays };

    case REMOVE_STAY:
      return {
        ...state,
        stays: state.stays.filter((stay) => stay._id !== action.stayId),
      };

    default:
      return state;
  }
}
