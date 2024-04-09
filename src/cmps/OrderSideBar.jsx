/**
 * This component represents the sidebar book item from the Airbnb website look-alike.
 * It displays information about a book, including a reserve button, price, and price for a night.
 */
export function OrderSideBar() {
    return (
        <div className="book-it-sidebar">
            <h2>$100</h2>
            <p>per night</p>
            <button>Reserve</button>
        </div>
    );
}