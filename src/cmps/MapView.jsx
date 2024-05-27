import React from 'react';
import GoogleMapReact from 'google-map-react';

import MapMarker from "../../public/MapMarker.svg";


const AnyReactComponent = ({ text }) =>
    <div className='map-marker'>
        <div className='chat-box'>
            <p>{text}</p>
            <div className="chat-arrow"></div>
        </div>
        <img src={MapMarker}></img>
    </div>;

export function MapView({ location }) {

    const handleApiLoaded = (map, maps) => {
        // use map and maps objects
    };

    const defaultProps = {
        center: {
            lat: 32.5,
            lng: 34.9
        },
        zoom: 15
    };

    return (
        <div className="map-container">
            <h2>Where you'll be</h2>
            <p>Palmachim, Center District, Israel</p>
            <div style={{ height: '400px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDMl5nCzylGqvy3ogV2cL1CIxCl7X1b0vQ' }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                >
                    <AnyReactComponent
                        {...defaultProps.center}
                        text="Exact location provided after booking."
                    />
                </GoogleMapReact>
            </div>


            <a href="#" className="show-more">Show more</a>
        </div>
    );
}
