import styles from "./MoreInfo.module.css";

export default function MoreInfo({ country }) {
  return (
    <div className={styles.container_info}>
      <div className={styles.country_info_box}>
        <div
          className={
            country.coatOfArms.svg == null
              ? styles.flags
              : styles.coatofarms_box
          }
        >
          {country.coatOfArms.svg == null ? (
            <img src={country.flags.png} alt={country.flags.alt}></img>
          ) : (
            <img
              src={country.coatOfArms.svg}
              alt={country.coatOfArms.alt}
            ></img>
          )}
        </div>
        <div>
          <div className={styles.name_country}>
            {country.name.common === undefined ? "-" : country.name.common}
          </div>
          <div className={styles.info_block}>
            <div className={styles.info}>
              <div>
                <p>Area: {country.area === undefined ? "-" : country.area}</p>
                <p>Fifa: {country.fifa === undefined ? "-" : country.fifa}</p>
                <p>
                  Car signs:{" "}
                  {country.car.signs === undefined ? "-" : country.car.signs}
                </p>
                <p>
                  Car side:{" "}
                  {country.car.side === undefined ? "-" : country.car.side}
                </p>
                <p>
                  Start of week:{" "}
                  {country.startOfWeek === undefined
                    ? "-"
                    : country.startOfWeek}
                </p>
              </div>
              <div className={styles.languages}>
                <p>
                  Status: {country.status === undefined ? "-" : country.status}
                </p>
                <p>
                  Independent: {country.independent === true ? "yes" : "no"}
                </p>
                <p>UnMember: {country.unMember === true ? "yes" : "no"}</p>
                <p>Landlocked: {country.landlocked === true ? "yes" : "no"}</p>
                <p>
                  Start number:{" "}
                  {country.idd.root === undefined ? "-" : country.idd.root}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
