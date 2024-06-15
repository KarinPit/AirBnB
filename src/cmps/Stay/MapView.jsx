import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from "../../../public/svg/MapMarker.svg";

const AnyReactComponent = ({ text }) => (
    <div className='map-marker'>
        <div className='chat-box'>
            <p>{text}</p>
            <div className="chat-arrow"></div>
        </div>
        <img src={MapMarker} alt="Map Marker" />
    </div>
);

export function MapView({ stay }) {
    const [defaultProps, setDefaultProps] = useState({
        center: { lat: 32.5, lng: 34.9 },
        zoom: 15
    });

    const handleApiLoaded = (map, maps) => {
        // use map and maps objects
    };

    useEffect(() => {
        if (stay && stay.loc && stay.loc.lat && stay.loc.lng) {
            const cleanLat = parseFloat(stay.loc.lat.toString().replace(/\s+/g, ''));
            const cleanLng = parseFloat(stay.loc.lng.toString().replace(/\s+/g, ''));

            // console.log(cleanLng, stay.loc.lng.toString(), stay.loc.lng.toString().length);
            setDefaultProps({
                center: { lat: cleanLat, lng: cleanLng },
                zoom: 8
            });
        }
    }, [stay]);

    return (
        <div className="map-container">
            <h2>Where you'll be</h2>
            <p>{stay.loc.address}</p>
            <div style={{ height: '400px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDMl5nCzylGqvy3ogV2cL1CIxCl7X1b0vQ" }}
                    center={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                >
                    <AnyReactComponent
                        lat={defaultProps.center.lat}
                        lng={defaultProps.center.lng}
                        text="Exact location provided after booking."
                    />
                </GoogleMapReact>
            </div>

            <a href="#" className="show-more">Show more</a>
        </div>
    );
}
