import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadStay } from '../../store/actions/stay.actions';

import { stayService } from "../../services/stay.service.local"
import { OrderSideBar } from "./OrderSideBar"
import { CalendarPicker } from "../General/CalendarPicker"
import { MapView } from "./MapView"

import profileImg from "../../../public/Albert.jpg"
import saveIcon from "../../../public/svg/heart-b&w.svg"
import shareIcon from "../../../public/svg/share.svg"
import StarIcon from "../../../public/svg/star.svg"
import doorIcon from "../../../public/svg/door.svg"
import medalIcon from "../../../public/svg/medal.svg"
import pawIcon from "../../../public/svg/paw.svg"
import rightArrow from "../../../public/svg/arrow-right-black.svg"
import chatBoxIcon from "../../../public/svg/chat-box.svg"
import CheckCircleIcon from "../../../public/svg/check-circle.svg"
import KeyIcon from "../../../public/svg/key.svg"
import mapIcon from "../../../public/svg/map.svg"
import priceTagIcon from "../../../public/svg/price-tag.svg"
import sprayerIcon from "../../../public/svg/sprayer.svg"

export function StayDetails({ stayId }) {
    const stay = useSelector(storeState => storeState.stayModule.stay);
    const isLoading = useSelector(storeState => storeState.stayModule.isLoading);
    const dispatch = useDispatch();

    const reviews = {
        overall: 3.0,
        count: 7,
        categories: {
            cleanliness: 4.3,
            accuracy: 5.0,
            checkIn: 5.0,
            communication: 5.0,
            location: 5.0,
            value: 5.0,
        }
    }

    const reviewsExtended = [
        {
            name: 'Hadas',
            location: '1 month on Airbnb',
            date: '1 week ago',
            stay: 'Stayed a few nights',
            rating: 5,
            reviewText: 'הגענו לבית הקסום של יוגי בימים מטורפים סביב החתונה שלנו, המקום מושלם ונתן לנו את השקט והשלווה שחיכינו לרגעים האלו! ☺️',
            image: 'path_to_image_of_hadas'
        },
        {
            name: 'Georgi',
            location: 'Israel',
            date: 'October 2023',
            stay: 'Stayed with a pet',
            rating: 5,
            reviewText: 'הייתה לנו חופשה כיפית בדירה עם נוף מהמם. המקום שקט, יפה, סביבה נעימה וחוף במרחק הליכה של 2 דקות.',
            image: 'path_to_image_of_georgi'
        },
        {
            name: 'Maor',
            location: 'Tel Aviv, Israel',
            date: '4 weeks ago',
            stay: 'Stayed with kids',
            rating: 5,
            reviewText: 'להרגיש כמו בייוון, בית נופש ליד הים התאחרנו אצל יוני לחופשה של ארבעה ימים',
            image: 'path_to_image_of_maor'
        },
        {
            name: 'Daniel',
            location: '11 years on Airbnb',
            date: 'September 2023',
            stay: 'Stayed a few nights',
            rating: 5,
            reviewText: 'Great place exactly as advertised. 2 minutes walk from the beach. Clean, cosy and pleasant home, with a roof terrace featuring an amazing view of the sunsets over the ocean.',
            image: 'path_to_image_of_daniel'
        }
    ]

    const host = {
        name: 'Yogi',
        reviews: 7,
        rating: 5,
        yearsHosting: 2,
        responseRate: 100,
        responseTime: 'within an hour',
        image: 'path_to_image_of_yogi'
    }

    const thingsToKnow = {
        houseRules: {
            title: 'House rules',
            items: [
                'Check-in: 12:00 PM - 2:00 PM',
                '5 guests maximum',
                'Pets allowed'
            ],
            linkText: 'Show more'
        },
        safetyProperty: {
            title: 'Safety & property',
            items: [
                'No carbon monoxide alarm',
                'No smoke alarm',
                'Nearby lake, river, other body of water'
            ],
            linkText: 'Show more'
        },
        cancellationPolicy: {
            title: 'Cancellation policy',
            items: [
                'Free cancellation before Sep 27.',
                'Review the Host’s full cancellation policy which applies even if you cancel for illness or disruptions caused by COVID-19.'
            ],
            linkText: 'Show more'
        }
    }

    const stayAmenities = {
        amenities: [
            { name: 'Garden view', icon: "../../public/svg/flower.svg" },
            { name: 'Shared beach access – Beachfront', icon: "../../public/svg/sunset.svg" },
            { name: 'Wifi', icon: "../../public/svg/wifi.svg" },
            { name: 'Free parking on premises', icon: "../../public/svg/car.svg" },
            { name: 'Carbon monoxide alarm', icon: "../../public/svg/paw.svg", strike: true },
            { name: 'Sea view', icon: "../../public/svg/sunset.svg" },
            { name: 'Kitchen', icon: "../../public/svg/kitchen-utensil.svg" },
            { name: 'Dedicated workspace', icon: "../../public/svg/paw.svg" },
            { name: 'TV', icon: "../../public/svg/tv.svg" },
            { name: 'Smoking allowed', icon: "../../public/svg/smoking.svg" },
            { name: 'Pets allowed', icon: "../../public/svg/paw.svg" },
            { name: 'Cooking basics', icon: "../../public/svg/kitchen-utensil.svg" },
            { name: 'Private hot tub - available all year', icon: "../../public/svg/paw.svg" },
            { name: 'Smoke alarm', icon: "../../public/svg/paw.svg", strike: true },
        ]
    }

    useEffect(() => {
        if (stayId) {
            loadStay(stayId)
        }
    }, [dispatch, stayId]);

    function handleScroll() {
        const stickyElement = stickyRef.current;
        const stopPoint = stopPointRef.current;
        const stopPointOffset = stopPoint.getBoundingClientRect().top + window.scrollY;
        const stickyElementHeight = stickyElement.offsetHeight;

        if (window.scrollY + stickyElementHeight + 10 > stopPointOffset) {
            stickyElement.style.position = 'absolute';
        } else {
            stickyElement.style.position = '-webkit-sticky'; // For Safari
            stickyElement.style.position = 'sticky';
            stickyElement.style.top = '10px';
        }
    }

    if (isLoading || !stay) return <div>Loading...</div>;

    return (
        <>
            <div className="stay-header">
                <h1>{stay.name}</h1>
                <div className="stay-header-actions">
                    <a>
                        <img src={shareIcon}></img>
                        <p>Share</p>
                    </a>
                    <a>
                        <img src={saveIcon}></img>
                        <p>Save</p>
                    </a>
                </div>
            </div>

            <div className="stay-img-gallery">
                {stay.imgUrls.map((img, idx) => {
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

            <div className="main-desc">
                <div className="stay-desc">
                    <div className="with-sticky-order">
                        <div>
                            <div>
                                <h2>{stay.type} in {stay.loc.city}, {stay.loc.country}</h2>
                                <p>{stay.capacity} guests &middot; {stay.amenities[0]} &middot; {stay.amenities[1]}</p>
                                <div className="review-summary">
                                    <div>
                                        <img src={StarIcon}></img>
                                        <p>{stay.reviews[0].rate}</p>
                                    </div>
                                    <p>&middot; </p>
                                    <p className="review-score">{stay.reviews.length} {stay.reviews.length === 1 ? 'review' : 'reviews'}</p>
                                </div>
                            </div>

                            <div className="host-info">
                                <img src={profileImg}></img>
                                <div>
                                    <h3 className="hosted-by">Hosted by {stay.host.fullname}</h3>
                                    <p className="host-experience">Superhost &middot; 7 years hosting</p>
                                </div>
                            </div>

                            <div className="more-info">
                                <div className="main-amenities">
                                    <div className="amenity">
                                        <div className="amenity-img">
                                            <img src={pawIcon}></img>
                                        </div>

                                        <div className="amenity-info">
                                            <h3>Furry friends welcome</h3>
                                            <p>Bring your pets along for the stay.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="amenity">
                                        <div className="amenity-img">
                                            <img src={doorIcon}></img>
                                        </div>

                                        <div className="amenity-info">
                                            <h3>Self check-in</h3>
                                            <p>Check yourself in with the keypad.</p>
                                        </div>
                                    </div>

                                    <div className="amenity">
                                        <div className="amenity-img">
                                            <img src={medalIcon}></img>
                                        </div>

                                        <div className="amenity-info">
                                            <h3>{stay.host.fullname} is a Superhost</h3>
                                            <p>Superhosts are experienced, highly rated Hosts.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="full-desc">
                                    <p>{stay.summary}</p>
                                    <button>
                                        <p>Show more</p>
                                        <img src={rightArrow}></img>
                                    </button>
                                </div>

                                <div className="place-offers-summary">
                                    <h2>What this place offers</h2>
                                    <div className="place-offers">
                                        {stay.amenities.map((amenity, idx) => {
                                            if (idx < 10) {
                                                let amenityIcon = stayAmenities.amenities.find(a => a.name === amenity)
                                                return (<div className="offer" key={idx}>
                                                    {amenityIcon && <img src={amenityIcon.icon}></img>}
                                                    <p>{amenity}</p>
                                                </div>)
                                            }
                                        })}
                                    </div>
                                    <button>Show all {stay.amenities.length} amenities</button>
                                </div>

                                <div className="order-calendar">
                                    <h2>8 nights in {stay.name}</h2>
                                    <p>Nov 1, 2024 - Nov 9, 2024</p>
                                    <CalendarPicker />
                                </div>
                            </div>
                        </div>
                        <div className="order-stay">
                            <OrderSideBar price={stay.price} />
                        </div>
                    </div>

                    <div className="reviews">
                        <div className="overall-rating">
                            <img src={StarIcon}></img>
                            <h2> {stay.reviews[0].rate} · {stay.reviews.length} reviews </h2>
                        </div>
                        <div className="ratings">
                            <div className="rating-category">
                                <div className="rating-title">Overall rating</div>
                                <div className="rating-bars">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <div key={i} className="bar">
                                            <p>{i + 1}</p>
                                            <div className={`rating-bar ${i < reviews.overall ? 'filled' : ''}`}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="rating-category">
                                <div>
                                    <div className="rating-title">Cleanliness</div>
                                    <div className="rating-value">
                                        {reviews.categories.cleanliness}
                                    </div>
                                </div>
                                <img src={sprayerIcon}></img>
                            </div>
                            <div className="rating-category">
                                <div>
                                    <div className="rating-title">Accuracy</div>
                                    <div className="rating-value">
                                        {reviews.categories.accuracy}
                                    </div>
                                </div>
                                <img src={CheckCircleIcon}></img>
                            </div>
                            <div className="rating-category">
                                <div>
                                    <div className="rating-title">Check-in</div>
                                    <div className="rating-value">
                                        {reviews.categories.checkIn}
                                    </div>
                                </div>
                                <img src={KeyIcon}></img>
                            </div>
                            <div className="rating-category">
                                <div>
                                    <div className="rating-title">Communication</div>
                                    <div className="rating-value">
                                        {reviews.categories.communication}
                                    </div>
                                </div>
                                <img src={chatBoxIcon}></img>
                            </div>
                            <div className="rating-category">
                                <div>
                                    <div className="rating-title">Location</div>
                                    <div className="rating-value">
                                        {reviews.categories.location}
                                    </div>
                                </div>
                                <img src={mapIcon}></img>
                            </div>
                            <div className="rating-category">
                                <div>
                                    <div className="rating-title">Value</div>
                                    <div className="rating-value">
                                        {reviews.categories.value}
                                    </div>
                                </div>
                                <img src={priceTagIcon}></img>
                            </div>
                        </div>
                    </div>

                    <div className="review-list">
                        {reviewsExtended.map((review, index) => (
                            <div key={index} className="review-card">
                                <div className="review-header">
                                    <img src={profileImg} alt={`${review.name}'s profile`} className="review-image" />
                                    <div className="review-details">
                                        <div className="review-name">{review.name}</div>
                                        <div className="review-location">{review.location}</div>
                                    </div>
                                </div>
                                <div className="review-rating">
                                    {Array.from({ length: review.rating }, (_, i) => (
                                        <img key={i} src={StarIcon}></img>
                                    ))}
                                    <span className="review-date">{review.date}</span>
                                    <span className="review-stay">{review.stay}</span>
                                </div>
                                <div className="review-text">{review.reviewText}</div>
                                <div className="review-more">Show more</div>
                            </div>
                        ))}
                    </div>

                    <div className="map-view">
                        <MapView location={stay.loc} />
                    </div>
                </div>
            </div>

            <div className="host-profile-container">
                <div className="host-profile">
                    <h2>Meet your Host</h2>
                    <div className="host-card">
                        <div className="host-info">
                            <div className="host-overview">
                                <img src={profileImg} alt={`${host.name}'s profile`} className="host-image" />
                                <div className="host-name">{host.name}</div>
                                <div className="host-role">Host</div>
                            </div>
                            <div className="host-stats">
                                <div className="host-details">
                                    <div className="host-detail">
                                        {host.reviews} Reviews
                                    </div>
                                    <div className="host-detail">
                                        {host.rating}
                                    </div>
                                    <div className="host-detail">
                                        {host.yearsHosting} Years hosting
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="host-contact">
                            <div className="contact-details">
                                <div className="contact-title">Host details</div>
                                <div className="contact-info">
                                    Response rate: {host.responseRate}%
                                </div>
                                <div className="contact-info">
                                    Responds {host.responseTime}
                                </div>
                                <button className="message-button">Message Host</button>
                            </div>
                            <div className="contact-warning">
                                To protect your payment, never transfer money or communicate outside of the Airbnb website or app.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="things-to-know">
                <h2>Things to know</h2>
                <div className="things-container">
                    <div className="thing">
                        <h3>{thingsToKnow.houseRules.title}</h3>
                        {thingsToKnow.houseRules.items.map((item, index) => (
                            <p key={index}>{item}</p>
                        ))}
                        <a href="#">{thingsToKnow.houseRules.linkText}</a>
                    </div>
                    <div className="thing">
                        <h3>{thingsToKnow.safetyProperty.title}</h3>
                        {thingsToKnow.safetyProperty.items.map((item, index) => (
                            <p key={index}>{item}</p>
                        ))}
                        <a href="#">{thingsToKnow.safetyProperty.linkText}</a>
                    </div>
                    <div className="thing">
                        <h3>{thingsToKnow.cancellationPolicy.title}</h3>
                        {thingsToKnow.cancellationPolicy.items.map((item, index) => (
                            <p key={index}>{item}</p>
                        ))}
                        <a href="#">{thingsToKnow.cancellationPolicy.linkText}</a>
                    </div>
                </div>
            </div>

        </>
    )
}


//     useEffect(() => {
//         if (stayId) loadStay()

//         return () => {
//         }
//     }, [])

//     async function loadStay() {
//         try {
//             const stay = await stayService.getById(stayId)
//             setStay(stay)
//         } catch (err) {
//             console.log('Had issues loading the stay', err)
//         }
//     }



//     if (!stay) return <div>Loading..</div>

// }