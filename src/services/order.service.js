
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'order'

export const orderService = {
    query,
    getById,
    save,
    remove,
    addorderMsg
}
window.cs = orderService


async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(STORAGE_KEY, filterBy)
}

function getById(orderId) {
    return httpService.get(`order/${orderId}`)
}

async function remove(orderId) {
    return httpService.delete(`order/${orderId}`)
}

async function save(order) {
    var savedorder
    if (order._id) {
        savedorder = await httpService.put(`order/${order._id}`, order)
    } else {
        savedorder = await httpService.post('order', order)
    }
    return savedorder
}

async function addorderMsg(orderId, txt) {
    const savedMsg = await httpService.post(`order/${orderId}/msg`, { txt })
    return savedMsg
}





