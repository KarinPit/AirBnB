import { stayService } from "../../services/stay/stay.service.local";
// import { stayService } from "../../services/stay/stay.service.js";
import { store } from "../store.js";

import { showErrorMsg } from "../../services/other/event-bus.service.js";
import {
  SET_STAYS,
  SET_STAY,
  REMOVE_STAY,
  SET_FILTER_BY,
  ADD_STAY,
  UPDATE_STAY,
  SET_IS_LOADING,
  GET_TOTAL_STAYS_FILTERED,
} from "../reducers/stay.reducer.js";


export async function loadStays() {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true });
  try {
    const { filterBy } = store.getState().stayModule;

    const stays = await stayService.query(filterBy);
    store.dispatch({ type: SET_STAYS, stays });

  } catch (err) {
    console.error("StayActions: err in loadStays", err);
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false });
  }
}

export async function removeStay(stayId) {
  try {
    await stayService.remove(stayId);
    store.dispatch({ type: REMOVE_STAY, stayId });
  } catch (err) {
    console.error("StayActions: err in removeStay", err);
  }
}

export async function saveStay(stay) {
  try {
    const type = stay.id ? UPDATE_STAY : ADD_STAY;
    const savedStay = await stayService.save(stay);
    store.dispatch({ type, stay: savedStay });
  } catch (err) {
    console.error("Had issues saving stays", err);
    throw err;
  }
}

export async function loadStay(stayId) {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true });
  try {
    const stay = await stayService.getById(stayId);
    store.dispatch({ type: SET_STAY, stay });
  } catch (err) {
    showErrorMsg("Cannot load stay");
    console.error("Cannot load stay", err);
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false });
  }
}

export function setFilterBy(fieldsToUpdate) {
  store.dispatch({ type: SET_FILTER_BY, fieldsToUpdate });
}

export async function getTotalStaysFiltered(filterBy) {
  const total = await stayService.getTotalFiltered(filterBy);
  store.dispatch({ type: GET_TOTAL_STAYS_FILTERED, total });
}

