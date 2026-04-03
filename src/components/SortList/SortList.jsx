import styles from "./SortList.module.css";

function SortList(props) {
  return (
    <div className={styles.filter}>
      <button key="id" variant="contained" onClick={() => props.filterById()}>
        Filter id{props.flagSortId ? "↓" : "↑"}
      </button>
      <button
        key="AB"
        variant="contained"
        onClick={() => props.filterAlphabetically()}
      >
        Filter {!props.flagSortAB ? "A-Y" : "Y-A"}
      </button>
      <button key="Reset" variant="contained" onClick={() => props.ResetAll()}>
        Reset
      </button>
    </div>
  );
}

export default SortList;
