const apiKey = "AIzaSyAo00XuaGr2OWB--LgTPyCAUxA7krfvbYg";
import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { useFormikContext } from "formik";
import { CurrentLocationIcon } from "../../services/svg.service";

const AnyReactComponent = () => (
  <div
    style={{
      position: "absolute",
      transform: "translate(-50%, -50%)",
      height: "100px",
      width: "100px",
    }}
  >
    <CurrentLocationIcon />
  </div>
);

export default function Map() {
  const { setFieldValue } = useFormikContext();
  const [center, setCenter] = useState({ lat: 59.95, lng: 30.33 });
  const [zoom, setZoom] = useState(11);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const newCenter = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(newCenter);
          setLoading(false);
          setFieldValue("loc", {
            ...newCenter,
            country: "",
            countryCode: "",
            city: "",
            address: "",
          });
        },
        function (error) {
          console.error("Error getting location: ", error);
          setLoading(false);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, [setFieldValue]);

  if (loading) return <div>Loading map...</div>;

  return (
    <section
      style={{
        height: "589px",
        width: "100%",
        overflow: "hidden",
        borderRadius: "16px",
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={center}
        defaultZoom={zoom}
        options={{
          disableDefaultUI: true,
        }}
      >
        <AnyReactComponent />
      </GoogleMapReact>
    </section>
  );
}
