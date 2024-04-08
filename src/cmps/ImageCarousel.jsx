import React from "react";
import Slider from "react-slick";

import NextArrow from "../../public/arrow-right.svg"
import PrevArrow from "../../public/arrow-left.svg"


export function ImageCarousel({ stay, showArrows }) {
    function SampleNextArrow(props) {
        const { className, onClick } = props;
        return (
            <>
                <div className={`${className} ${showArrows ? 'show-arrows' : ''}`} onClick={onClick}>
                    <img src={NextArrow}></img>
                    <div className="arrow-bg"></div>
                </div>
            </>
        )
    }

    function SamplePrevArrow(props) {
        const { className, onClick } = props;
        return (
            <div className={`${className} ${showArrows ? 'show-arrows' : ''}`} onClick={onClick}>
                <img src={PrevArrow}></img>
                <div className="arrow-bg"></div>
            </div>
        )
    }

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    }

    return (
        <Slider {...settings} className="slides">
            {stay.imgUrls.map(image => <div className="slide" key={stay._id}>
                <img src={image}></img>
            </div>)}
        </Slider>
    );

}