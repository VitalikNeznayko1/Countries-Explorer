import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CountriesList.module.css";

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
          <Link
            className={styles.country_item}
            onMouseEnter={() => onMouseEnter(item.id)}
            onMouseLeave={() => onMouseLeave()}
            key={item.name.common}
            to={`/about/${item.cca3}`}
          >
            <div className={styles.item_right} >
              <img src={item.flags.png} alt={item.flags.alt} />
              <div className={styles.index}>{item.id}</div>
            </div>
            <span className={styles.item_name_common}>{item.name.common}</span>
          </Link>
        ))}
      </div>
      <div>
        {showDiv.isVisible && (
          <div className={styles.info_country_box}>
            <img
              className={styles.flag}
              src={showDiv.object.flags.png}
              alt={showDiv.object.flags.alt}
            />
            <div className={styles.country_info}>
              <div>Name: {showDiv.object.name.common}</div>
              <div>Capital: {showDiv.object.capital}</div>
              <div>Population: {showDiv.object.population}</div>
              <div>Region: {showDiv.object.region}</div>
              <div>
                Landlocked: {showDiv.object.landlocked == false ? "No" : "Yes"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CountriesList;
