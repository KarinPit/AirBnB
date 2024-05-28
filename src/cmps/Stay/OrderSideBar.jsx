/**
 * This component represents the sidebar book item from the Airbnb website look-alike.
 * It displays information about a book, including a reserve button, price, and price for a night.
 */
export function OrderSideBar({ price }) {
    return (
        <div className="book-it-sidebar">
            <h2>${price} <span>night</span></h2>

            <form>
                <input className="check-in" placeholder="CHECK-IN"></input>
                <input className="check-out" placeholder="CHECKOUT"></input>
                <input className="guests" placeholder="GUESTS"></input>
            </form>
            <button>Reserve</button>

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