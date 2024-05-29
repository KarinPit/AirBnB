import { orderService } from "../../services/order.service.local.js";
import { store } from "../store.js";

import { showErrorMsg } from "../../services/event-bus.service.js";
import {
    SET_ORDERS,
    REMOVE_ORDER,
    SET_FILTER_BY,
    ADD_ORDER,
    UPDATE_ORDER,
    SET_IS_LOADING,
    GET_TOTAL_ORDERS_FILTERED,
} from "../reducers/order.reducer.js";


export async function loadOrders() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true });
    try {
        // const { filterBy } = store.getState().orderModule;
        const orders = await orderService.query();
        store.dispatch({ type: SET_ORDERS, orders });

    } catch (err) {
        console.error("OrderActions: err in loadOrders", err);
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false });
    }
}

export async function removeOrder(orderId) {
    try {
        await orderService.remove(orderId);
        store.dispatch({ type: REMOVE_ORDER, orderId });
    } catch (err) {
        console.error("OrderActions: err in removeOrder", err);
    }
}

export async function saveOrder(order) {
    try {
        const type = order.id ? UPDATE_ORDER : ADD_ORDER;
        const savedOrder = await orderService.save(order);
        store.dispatch({ type, order: savedOrder });
    } catch (err) {
        console.error("Had issues saving orders", err);
        throw err;
    }
}

export async function loadOrder(orderId) {
    try {
        const res = await orderService.getById(orderId);
        store.dispatch({ type: ADD_ORDER, res });
    } catch (err) {
        showErrorMsg("Cannot load order");
        console.error("Cannot load order", err);
    }
}

export function setFilterBy(fieldsToUpdate) {
    store.dispatch({ type: SET_FILTER_BY, fieldsToUpdate });
}

export async function getTotalOrdersFiltered(filterBy) {
    const total = await orderService.getTotalFiltered(filterBy);
    store.dispatch({ type: GET_TOTAL_ORDERS_FILTERED, total });
}

