import { stayService } from "../../services/stay.service.local.js";
import { store } from '../store.js'

import { showErrorMsg } from '../../services/event-bus.service.js'
import { LOADING_DONE, LOADING_START } from "../reducers/system.reducer.js";
import { REMOVE_STAY, SET_STAY, SET_STAYS } from "../reducers/stay.reducer.js";

export async function loadStays() {
    try {
        store.dispatch({ type: LOADING_START })
        const stays = await stayService.query()
        store.dispatch({ type: SET_STAYS, stays })
    } catch (err) {
        console.log('StayActions: err in loadStays', err)
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function removeStay(stayId) {
    try {
        await stayService.remove(stayId)
        store.dispatch({ type: REMOVE_STAY, stayId })
    } catch (err) {
        console.log('StayActions: err in removeStay', err)
    }
}

export async function updateStay(stay) {
    try {
        const res = await stayService.save(stay)
        store.dispatch({
            type: SET_STAY,
            res
        })
        return res
    } catch (err) {
        console.log('Cannot update stay', err)
        throw err
    }
}

export async function loadStay(stayId) {
    try {
        const res = await stayService.getById(stayId);
        store.dispatch({ type: SET_STAY, res })
    } catch (err) {
        showErrorMsg('Cannot load stay')
        console.log('Cannot load stay', err)
    }
}
