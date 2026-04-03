import { useState } from "react";
import styles from "./HeaderHome.module.css";
import { useNavigate } from "react-router";

export default function HeaderHome({ allCountry, headerText}) {
  const [CountrySearch, setCountrySearch] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    if (e.target.value === "") {
      setCountrySearch([]);
      return;
    }

    const resultArr = allCountry.filter((item) =>
      item.name.common.toLowerCase().startsWith(e.target.value.toLowerCase())
    );

    setCountrySearch(resultArr);
  };

  const handleSearchButton = () => {
    if (CountrySearch.length > 0) {
      navigate(`/about/${CountrySearch[0].cca3}`);
    }
  };

  return (
    <div className={styles.header_container}>
      <div className={styles.header_text}>{headerText}</div>
      <div className={styles.searcher}>
        <input
          onChange={handleSearchChange}
          placeholder="Search..."
          list="country"
          type="text"
        />
        <datalist id="country">
          {CountrySearch.map((item) => (
            <option key={item.name.common} value={item.name.common}></option>
          ))}
        </datalist>
        <button key = "Search" className={styles.search_button} onClick={handleSearchButton}>
          Search
        </button>
      </div>
    </div>
  );
}