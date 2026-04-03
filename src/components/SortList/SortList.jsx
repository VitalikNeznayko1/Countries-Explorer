import { useEffect, useState } from "react";
import styles from "./SortList.module.css";
import ContinentsContainer from "./Continents/ContinentsContainer";

function SortList({
  allCountry,
  sortedCountry,
  setSortedCountry,
  setCurrentPage,
}) {
  const [flagSortAB, setFlagSortAB] = useState(false);
  const [flagSortId, setFlagSortId] = useState(false);
  const [currentContinent, setCurrentContinent] = useState(null);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [regions, setRegion] = useState([]);

  useEffect(() => {
    const tmp = allCountry.reduce((acc, country) => {
      const continent = country.continents?.[0];
      const subregion = country.subregion;

      if (!continent || !subregion) return acc;

      if (!acc[continent]) acc[continent] = new Set();
      acc[continent].add(subregion);

      return acc;
    }, {});

    setRegion(tmp);
  }, [allCountry]);

  const filterById = () => {
    const base = sortedCountry.length ? sortedCountry : allCountry;
    const sorted = [...base].sort((a, b) =>
      flagSortId ? a.id - b.id : b.id - a.id,
    );

    setFlagSortId(!flagSortId);
    setFlagSortAB(false);
    setSortedCountry(sorted);
    setCurrentPage(1);
  };

  const filterAlphabetically = () => {
    const base = sortedCountry.length ? sortedCountry : allCountry;
    const sorted = [...base].sort((a, b) => {
      if (a.name.common < b.name.common) return flagSortAB ? 1 : -1;
      if (a.name.common > b.name.common) return flagSortAB ? -1 : 1;
      return 0;
    });

    setFlagSortAB(!flagSortAB);
    setFlagSortId(false);
    setSortedCountry(sorted);
    setCurrentPage(1);
  };

  const ResetAll = () => {
    setCurrentContinent(null);
    setCurrentRegion(null);
    setFlagSortAB(false);
    setFlagSortId(false);

    const sorted = [...allCountry].sort((a, b) => a.id - b.id);
    setSortedCountry(sorted);
    setCurrentPage(1);
  };

  if (allCountry.length === 0) return <div>Loading...</div>;

  return (
    <div className={styles.container_filter}>
      <div className={styles.filter}>
        <button key="id" variant="contained" onClick={() => filterById()}>
          Filter id{flagSortId ? "↓" : "↑"}
        </button>
        <button
          key="AB"
          variant="contained"
          onClick={() => filterAlphabetically()}
        >
          Filter {!flagSortAB ? "A-Y" : "Y-A"}
        </button>
        <button key="Reset" variant="contained" onClick={() => ResetAll()}>
          Reset
        </button>
      </div>
      <ContinentsContainer
        regions={regions}
        currentContinent={currentContinent}
        currentRegion={currentRegion}
        setCurrentContinent={setCurrentContinent}
        setCurrentRegion={setCurrentRegion}
        allCountry={allCountry}
        setSortedCountry={setSortedCountry}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default SortList;
