import styles from "./MainInfo.module.css";
import { Link } from "react-router-dom";

export default function MainInfo({ country }) {
  const currenciesKey =
    country.currencies != null ? Object.keys(country.currencies) : null;
  const langKey =
    country.languages != null ? Object.keys(country.languages) : null;
  return (
    <div className={styles.container_info}>
      <div className={styles.country_info_box}>
        <div className={styles.flags}>
          <img src={country.flags.png} alt={country.flags.alt}></img>
        </div>
        <div>
          <div className={styles.name_country}>
            {country.name.official === undefined ? "-" : country.name.official}
          </div>
          <div className={styles.info_block}>
            <div className={styles.info}>
              <div>
                <p>
                  Population:{" "}
                  {country.population === undefined ? "-" : country.population}
                </p>
                <p>
                  Region: {country.region === undefined ? "-" : country.region}
                </p>
                <p>
                  Capital:{" "}
                  {country.capital === undefined ? "-" : country.capital}
                </p>
              </div>
              <div className={styles.languages}>
                <p>
                  Continets:{" "}
                  {country.continents === undefined ? "-" : country.continents}
                </p>
                <p>
                  Languages:{" "}
                  {langKey.map((item, index) => (
                    <Link
                      className={styles.language}
                      key={item}
                      to={`/home/language/${item}`}
                    >
                      {country.languages[item]}
                      {langKey[index + 1] === undefined ? " " : ", "}
                    </Link>
                  ))}
                </p>
                <p>
                  Curiencies:{" "}
                  {currenciesKey === null
                    ? "-"
                    : currenciesKey.map(
                        (item, index) =>
                          `${country.currencies[item].name}${
                            currenciesKey[index + 1] === undefined ? "" : ","
                          } `,
                      )}
                </p>
              </div>
            </div>
            <div>
              <p className={styles.container_border}>
                <span className={styles.text_border}>Borders:</span>
                <span className={styles.border}>
                  {country.borders === undefined
                    ? "-"
                    : country.borders.map((item) => (
                        <Link key={item} to={`/about/${item}`}>
                          <button>{item}</button>
                        </Link>
                      ))}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
