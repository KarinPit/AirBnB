import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { format, isValid, parse } from 'date-fns';
import { updateCurrentOrder } from '../../store/actions/order.actions';


export function OrderDetails({ price }) {

    const currentOrder = useSelector(storeState => storeState.orderModule.currentOrder);
    const stay = useSelector(storeState => storeState.stayModule.stay);

    function formatDate(type) {
        const date = currentOrder[type];
        if (!date || !isValid(new Date(date))) {
            return ''; // Return an empty string if the date is not set or invalid
        }
        return String(format(new Date(date), 'dd.MM.yyyy'));
    }

    // function handleReserve() {
    //     const orderToSave = { ...currentOrder, stayId: stay._id }
    //     console.log(orderToSave);
    //     updateCurrentOrder(orderToSave)
    // }

    function handleDateChange(event, type) {
        const value = event.target.value;
        const parsedDate = parse(value, 'dd.MM.yyyy', new Date());
        if (isValid(parsedDate)) {
            const orderToSave = { ...currentOrder, [type]: parsedDate }
            updateCurrentOrder(orderToSave);
        } else {
            const orderToSave = { ...currentOrder, [type]: parsedDate }
            updateCurrentOrder(orderToSave);
        }
    }

    function handleGuestChange(event,) {
        const value = event.target.value;
        const orderToSave = { ...currentOrder, [type]: value }
        updateCurrentOrder(orderToSave);
        console.log('guests changed');
    }

    return (
        <div className="book-it-sidebar">
            <h2>${price} <span>night</span></h2>

            <form>
                <input
                    className="check-in"
                    placeholder={formatDate('startDate') ? formatDate('startDate') : "CHECK-IN"}
                    value={formatDate('startDate')}
                    onChange={(e) => handleDateChange(e, 'startDate')}
                />
                <input
                    className="check-out"
                    placeholder="CHECKOUT"
                    value={formatDate('endDate')}
                    onChange={(e) => handleDateChange(e, 'endDate')}
                />
                <input className="guests" placeholder="GUESTS"
                    value={currentOrder.guestCount}
                    onChange={(e) => handleGuestChange(e, 'guestCount')} />
            </form>
            <Link to={`/order/${stay._id}`}>
                <button >Reserve</button>
            </Link>
            <p>You won't be charged yet</p>

            <div className="price-calc">
                <div className="net-price">
                    <p>₪971 x 5 nights</p>
                    <p>₪4,853</p>
                </div>
                <div className="cleaning-fee">
                    <p>Cleaning fee</p>
                    <p>₪376</p>
                </div>
                <div className="service-fee">
                    <p>Airbnb service fee</p>
                    <p>₪738</p>
                </div>
            </div>

            <div className="total-price">
                <p>Total</p>
                <p>₪5,967</p>
            </div>
        </div>
    );
}