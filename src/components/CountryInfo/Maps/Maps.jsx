import React, { useEffect, useState } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useParams } from "react-router-dom";
import countryApi from "../../../api/countryApi";
import styles from "./Maps.module.css"; 

const Maps = ({ country }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!country) {
    return <div>Loading...</div>;
  }

  if (country === "Error") {
    return <div>There was an error loading the country.</div>;
  }

  const defaultCenter = {
    lat: country.latlng[0],
    lng: country.latlng[1],
  };

  return (
    <div className={styles.map_container}>
      {isLoaded && (
        <GoogleMap
          mapContainerClassName={styles.map}
          zoom={6}
          center={defaultCenter}
        >
          <Marker position={defaultCenter} />
        </GoogleMap>
      )}
    </div>
  );
};

export default Maps;
