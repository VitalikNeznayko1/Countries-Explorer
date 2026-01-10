import { useEffect, useState } from "react";
import "./SortList.css";

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
      flagSortId ? a.id - b.id : b.id - a.id
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

  const SortByContinent = (item) => {
    if (currentContinent != item) {
      setCurrentContinent(item);
      setCurrentRegion(null);
      const tmp = allCountry.filter((obj) => obj.continents?.[0] === item);
      setSortedCountry(tmp);
      setCurrentPage(1);
    } else {
      setCurrentContinent(null);
      setSortedCountry(allCountry);
    }
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

  const SortByRegion = (item) => {
    setCurrentRegion(item);
    const tmp = allCountry.filter(
      (obj) =>
        String(obj.continents) === String(currentContinent) &&
        String(obj.subregion) === String(item)
    );

    setSortedCountry(tmp);
    setCurrentPage(1);
  };

  if (allCountry.length === 0) return <div>Loading...</div>;

  return (
    <div className="container-filter">
      <div className="filter">
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
      <div key="continents" className="continents">
        {Object.keys(regions).map((item) => (
          <div key={item} className="continents">
            <button onClick={() => SortByContinent(item)}>{item}</button>
            {currentContinent === item && (
              <div key="blockreg" className="subreg">
                {Array.from(regions[currentContinent]).map((subregion) => {
                  if (currentContinent != "Antarctica") {
                    return (
                      <button
                        onClick={() => SortByRegion(subregion)}
                        key={subregion}
                      >
                        {subregion}
                      </button>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SortList;
