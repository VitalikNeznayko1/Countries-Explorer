import React, { useEffect, useState } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useParams } from "react-router-dom";
import countryApi from "../../api/countryApi";
import styles from "./Maps.module.css";

const Maps = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBcbQOenBrouiGdjYHHIpHvAD9Lzxn3K84",
  });
  const [country, setCountry] = useState(null);
  let { cca3 } = useParams();

  useEffect(() => {
    async function fetchCountry() {
      try {
        const result = await countryApi.getByCode(cca3);

        const tmp = result.data.find((item) => item.cca3 === cca3);
        setCountry(tmp);
      } catch {
        setCountry("Error");
      }
    }
    fetchCountry();
  }, [cca3]);

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
        <GoogleMap mapContainerClassName={styles.map} zoom={6} center={defaultCenter}>
          <Marker position={defaultCenter} />
        </GoogleMap>
      )}
    </div>
  );
};

export default Maps;
