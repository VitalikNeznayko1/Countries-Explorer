import { Link } from "react-router-dom";
import styles from "./CountryItem.module.css";

export default function CountryItem({ country, onMouseEnter, onMouseLeave }) {
  return (
    <Link
      className={styles.country_item}
      onMouseEnter={() => onMouseEnter(country.id)}
      onMouseLeave={() => onMouseLeave()}
      to={`/about/${country.cca3}`}
    >
      <div className={styles.item_right}>
        <img src={country.flags.png} alt={country.flags.alt} />
        <div className={styles.index}>{country.id}</div>
      </div>
      <span className={styles.item_name_common}>{country.name.common}</span>
    </Link>
  );
}
