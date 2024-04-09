import { useSelector } from "react-redux"

import { OrderSideBar } from "../cmps/OrderSideBar"

export function StayDetails({ stayId }) {
    const stays = useSelector((storeState) => storeState.stayModule.stays)
    const currentStay = stays[0].filter(currStay => currStay._id === stayId)[0]

    return (
        <>
            <div className="stay-header">
                <h1>{currentStay.name}</h1>
                <div className="stay-header-actions">
                    <p>Share</p>
                    <p>Save</p>
                </div>
            </div>

            <div className="stay-img-gallery">
                {currentStay.imgUrls.map((img, idx) => {
                    if (idx <= 5) {
                        return (
                            <img
                                key={idx}
                                src={img}
                                className={idx === 0 ? "main-img" : ""}
                                alt={`Description ${idx + 1}`}
                            />
                        )
                    }
                    return null
                })}
                <div className="overlay"></div>
            </div>

            <div className="stay-desc">
                <h2>{currentStay.type} in {currentStay.loc.city}, {currentStay.loc.country}</h2>
                <p>{currentStay.capacity} guests &middot; {currentStay.amenities[0]} &middot; {currentStay.amenities[1]}</p>
                <p>{currentStay.reviews.length} review</p>
                <p>Hosted by {currentStay.host.fullname}</p>
                <p>Free cancellation for 48 hours</p>
                <p>Self check-in</p>
                <p>Great communication</p>
                <p>{currentStay.summary}</p>
                <OrderSideBar />
            </div>
        </>
    )
}