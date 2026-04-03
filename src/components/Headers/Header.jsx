import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header({
  title,
  allCountry = [],
  searchable = false,
  showBack = false,
}) {
  const [countrySearch, setCountrySearch] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    if (e.target.value === "") {
      setCountrySearch([]);
      return;
    }

    const resultArr = allCountry.filter((item) =>
      item.name.common.toLowerCase().startsWith(e.target.value.toLowerCase()),
    );

    setCountrySearch(resultArr);
  };

  const handleSearchButton = () => {
    if (countrySearch.length > 0) {
      navigate(`/about/${countrySearch[0].cca3}`);
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.back}>
        {showBack && (
          <>
            <button onClick={() => navigate(-1)}>Back</button>
            <Link to="/">
              <button>Back to list</button>
            </Link>
          </>
        )}
      </div>

      <div className={styles.header_content}>
        {title && <div className={styles.header_text}>{title}</div>}

        {searchable && (
          <div className={styles.searcher}>
            <input
              onChange={handleSearchChange}
              placeholder="Search..."
              list="country"
            />

            <datalist id="country">
              {countrySearch.map((item) => (
                <option key={item.name.common} value={item.name.common} />
              ))}
            </datalist>

            <button onClick={handleSearchButton}>Search</button>
          </div>
        )}
      </div>
    </div>
  );
}
