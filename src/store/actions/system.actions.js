import { store } from '../store.js'
import { SET_USER_TYPE } from '../reducers/system.reducer.js';

export async function changeUserType(userType) {
    try {
        store.dispatch({ type: SET_USER_TYPE, userType })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
    }
}

