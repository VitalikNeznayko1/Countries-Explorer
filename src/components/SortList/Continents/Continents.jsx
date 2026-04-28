import styles from "./Continents.module.css";

const Continents = (props) => {
  return (
    <div>
      {Object.keys(props.regions).map((item) => (
        <div key={item} className={styles.continents}>
          <button
            onClick={() => props.SortByContinent(item)}
            className={
              props.currentContinent?.trim() === item?.trim()
                ? styles.active
                : ""
            }
          >
            {console.log(props.currentContinent, item)}
            {console.log(typeof props.currentContinent, typeof item)}
            {item}
          </button>
          {props.currentContinent?.trim() === item?.trim() && (
            <div className={styles.subreg}>
              {Array.from(props.regions[props.currentContinent]).map(
                (subregion) => (
                  <button
                    onClick={() => props.SortByRegion(subregion)}
                    key={subregion}
                    className={
                      props.currentRegion === subregion ? styles.active : ""
                    }
                  >
                    {subregion}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Continents;
