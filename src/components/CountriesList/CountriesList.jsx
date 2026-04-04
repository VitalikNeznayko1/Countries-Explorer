import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CountriesList.module.css";
import CountryPreview from "./CountryPreview/CountryPreview";
import CountryItem from "./CountryItem/CountryItem";

function CountriesList({ contriesOnPage }) {
  const [showDiv, setShowDiv] = useState({
    isVisible: false,
    object: null,
  });

  const onMouseEnter = (id) => {
    setShowDiv({
      isVisible: true,
      object: contriesOnPage.find((item) => item.id === id),
    });
  };

  const onMouseLeave = () => {
    setShowDiv({
      isVisible: false,
      object: null,
    });
  };

  return (
    <div className={styles.main_page}>
      <div className={styles.country_list}>
        {contriesOnPage.map((item) => (
          <CountryItem
            country={item}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            key={item.cca3}
          />
        ))}
      </div>
      <CountryPreview showDiv={showDiv} />
    </div>
  );
}

export default CountriesList;
