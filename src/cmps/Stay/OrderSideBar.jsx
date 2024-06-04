import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { format, isValid, intervalToDuration } from 'date-fns';
import { updateCurrentOrder } from '../../store/actions/order.actions';
import { setFilterBy, loadStays } from '../../store/actions/stay.actions';
import React from 'react';


export function OrderSideBar({ price }) {

    const currentOrder = useSelector(storeState => storeState.orderModule.currentOrder);
    const stay = useSelector(storeState => storeState.stayModule.stay);
    const loggedUser = JSON.parse(sessionStorage.loggedinUser)
    const cleaningFee = 10
    const airbnbFee = 25

    function formatDate(type) {
        const date = currentOrder.range[type];
        if (!date || !isValid(new Date(date))) {
            return ''; // Return an empty string if the date is not set or invalid
        }
        return String(format(new Date(date), 'dd.MM.yyyy'));
    }


    return (
        <div className="book-it-sidebar">
            <h2>${stay.price}<span> night</span></h2>

            <form>
                <input
                    className="check-in"
                    placeholder={currentOrder && currentOrder.range && currentOrder.range.start ? format(currentOrder.range.start, 'd.M.yyyy') : "CHECK-IN"}
                    value={currentOrder && currentOrder.range && currentOrder.range.start ? format(currentOrder.range.start, 'd.M.yyyy') : null}
                    readOnly
                />
                <input
                    className="check-out"
                    placeholder={currentOrder && currentOrder.range && currentOrder.range.end ? format(currentOrder.range.end, 'd.M.yyyy') : "CHECK-IN"}
                    value={currentOrder && currentOrder.range && currentOrder.range.end ? format(currentOrder.range.end, 'd.M.yyyy') : null}
                    readOnly
                />
                <input className="guests" placeholder="GUESTS"
                    value={currentOrder.guests ? Object.entries(currentOrder.guests)
                        .filter(([key, count]) => count > 0)
                        .map(([key, count]) => count > 0 ? `${count} ${key}` : '')
                        .join(', ') : ''}
                    readOnly
                />
            </form>
            {'range' in currentOrder && 'guests' in currentOrder && loggedUser ?
                <Link to={`/order/${stay._id}`}>
                    <button>Reserve</button>
                </Link> :
                <Link to={`/order/${stay._id}`} onClick={(event) => event.preventDefault()}>
                    <button className='disabled-reserve'>Reserve</button>
                </Link>
            }
            <p>You won't be charged yet</p>

            <div className="price-calc">
                <div className="net-price">
                    {currentOrder.range && currentOrder.range.start && currentOrder.range && currentOrder.range.end ?
                        <><p>${stay.price} x  {intervalToDuration({ start: currentOrder.range.start, end: currentOrder.range.end }).days} nights</p>
                            <p>${stay.price * intervalToDuration({ start: currentOrder.range.start, end: currentOrder.range.end }).days}</p></> : ''}
                </div>
                <div className="cleaning-fee">
                    <p>Cleaning fee</p>
                    <p>${cleaningFee}</p>
                </div>
                <div className="service-fee">
                    <p>Airbnb service fee</p>
                    <p>${airbnbFee}</p>
                </div>
            </div>

            <div className="total-price">
                <p>Total</p>
                {currentOrder.range && currentOrder.range.start && currentOrder.range && currentOrder.range.end ?
                    <p>${stay.price * intervalToDuration({
                        start: currentOrder.range.start,
                        end: currentOrder.range.end
                    }).days - cleaningFee - airbnbFee}</p> : '$0'}
            </div>
        </div>
    );
}