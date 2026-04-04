import styles from "./CountryPreview.module.css";
export default function CountryPreview({ showDiv }) {
  return (
    <div>
      {showDiv.isVisible && (
        <div className={styles.country_preview_box}>
          <img
            className={styles.flag}
            src={showDiv.object.flags.png}
            alt={showDiv.object.flags.alt}
          />
          <div className={styles.country_preview}>
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
  );
}
