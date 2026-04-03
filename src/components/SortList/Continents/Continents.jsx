
import styles from "./Continents.module.css";

const Continents = (props) => {
  return (
    <div>
      {Object.keys(props.regions).map((item) => (
        <div key={item} className={styles.continents}>
          <button onClick={() => props.SortByContinent(item)}>{item}</button>
          {props.currentContinent === item &&
            props.currentContinent !== "Antarctica" && (
              <div className={styles.subreg}>
                {Array.from(props.regions[props.currentContinent]).map(
                  (subregion) => (
                    <button
                      onClick={() => props.SortByRegion(subregion)}
                      key={subregion}
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
