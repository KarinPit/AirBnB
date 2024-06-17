import { storageService } from '../other/async-storage.service.js'
import { httpService } from '../other/http.service.js'
import { utilService } from '../other/util.service.js'
import { userService } from '../user/user.service'


const BASE_URL = 'order/'
const STORAGE_KEY_CURRENT_ORDER = 'currentOrder'

export const orderService = {
    query,
    queryCurrentOrder,
    getById,
    save,
    saveCurrentOrder,
    remove,
    getEmptyOrder,
    addOrderMsg,
    fetchBuyerOrders
}
window.cs = orderService

async function query(filterBy) {
    return httpService.get(BASE_URL, filterBy)
}

async function fetchBuyerOrders(buyerId) {
    try {
        const orders = await orderService.query({ buyerId });
        return orders
    } catch (error) {
        console.error('Failed to fetch orders:', error);
    }
}

function getById(orderId) {
    return httpService.get(BASE_URL + orderId)
}

async function remove(orderId) {
    return httpService.delete(BASE_URL + orderId)
}
async function save(order) {
    var savedOrder
    if (order._id) {
        savedOrder = await httpService.put(BASE_URL + order._id, order)
    } else {
        savedOrder = await httpService.post(BASE_URL, order)
    }
    return savedOrder
}

async function addOrderMsg(orderId, txt) {
    const savedMsg = await httpService.post(`${BASE_URL}${orderId}/msg`, { txt })
    return savedMsg
}


function getEmptyOrder() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        speed: utilService.getRandomIntInclusive(1000, 9000),
    }
}

async function queryCurrentOrder() {
    var currentOrder = await storageService.query(STORAGE_KEY_CURRENT_ORDER)
    return currentOrder
}

async function saveCurrentOrder(order) {
    // console.log('POST', order);
    // savedorder = await storageService.post(STORAGE_KEY_CURRENT_ORDER, order)
    // console.log(order);
    localStorage.setItem(STORAGE_KEY_CURRENT_ORDER, order)
}