import React from "react";
import Slider from "react-slick";


export function ImageCarousel({ stay }) {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    return (
        <Slider {...settings} className="slides">
            {stay.imgUrls.map(image => <div className="slide" key={stay._id}>
                <img src={image}></img>
            </div>)}
        </Slider>
    );

}