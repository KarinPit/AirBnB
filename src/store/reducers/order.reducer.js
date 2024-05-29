import { orderService } from "../../services/order.service.local";

export const SET_ORDERS = "SET_ORDERS";
export const ADD_ORDER = "ADD_ORDER";
export const UPDATE_ORDER = "UPDATE_ORDER";
export const REMOVE_ORDER = "REMOVE_ORDER";
export const SET_FILTER_BY = "SET_FILTER_BY";
export const SET_IS_LOADING = "SET_IS_LOADING";
export const GET_TOTAL_ORDERS_FILTERED = "GET_TOTAL_ORDERS_FILTERED";

const initialState = {
  orders: [],
  isLoading: true,
  totalFiltered: 0,
}

export function orderReducer(state = initialState, action) {
  var newState = state

  switch (action.type) {
    case SET_ORDERS:
      newState = { ...state, orders: action.orders }
    // return {
    //   ...state,
    //   ORDERs: action.ORDERS,
    // };
    case ADD_ORDER:
      return { ...state, orders: action.orders };

    case UPDATE_ORDER:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.order.id ? action.order : order
        ),
      };

    case REMOVE_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order) => order._id !== action.orderId),
      };
    case SET_FILTER_BY:
      return {
        ...state,
        filterBy: { ...state.filterBy, ...action.fieldsToUpdate },
      };
    case GET_TOTAL_ORDERS_FILTERED:
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
