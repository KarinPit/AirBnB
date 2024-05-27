export const SET_IS_LOADING = "SET_IS_LOADING";
export const SET_USER_TYPE = "SET_USER_TYPE";

const initialState = {
  isLoading: false,
  userType: "STAYER",
};

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading };
    case SET_USER_TYPE:
      return { ...state, userType: action.userType };
    default:
      return state;
  }
}
