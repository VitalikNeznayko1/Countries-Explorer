import { useEffect, useState } from "react";
import SortList from "./SortList";
import Continents from "./Continents/Continents";

function SortListContainer({
  allCountry,
  sortedCountry,
  setSortedCountry,
  setCurrentPage,
}) {
  const [flagSortAB, setFlagSortAB] = useState(false);
  const [flagSortId, setFlagSortId] = useState(false);
  const [currentContinent, setCurrentContinent] = useState(null);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [regions, setRegions] = useState({});

  useEffect(() => {
    const tmp = allCountry.reduce((acc, country) => {
      const continent = country.continents?.[0];
      const subregion = country.subregion;

      if (!continent || !subregion) return acc;

      if (!acc[continent]) acc[continent] = new Set();
      acc[continent].add(subregion);

      return acc;
    }, {});

    setRegions(tmp);
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

  const SortByRegion = (item) => {
    setCurrentRegion(item);

    const tmp = allCountry.filter(
      (obj) =>
        obj.continents?.[0] === currentContinent &&
        obj.subregion === item,
    );

    setSortedCountry(tmp);
    setCurrentPage(1);
  };

  const SortByContinent = (item) => {
    if (currentContinent !== item) {
      setCurrentContinent(item);
      setCurrentRegion(null);

      const tmp = allCountry.filter(
        (obj) => obj.continents?.[0] === item,
      );

      setSortedCountry(tmp);
    } else {
      setCurrentContinent(null);
      setSortedCountry(allCountry);
    }

    setCurrentPage(1);
  };

  if (allCountry.length === 0) return <div>Loading...</div>;

  return (
    <>
      <SortList
        ResetAll={ResetAll}
        filterAlphabetically={filterAlphabetically}
        filterById={filterById}
        allCountry={allCountry}
        flagSortAB={flagSortAB}
        flagSortId={flagSortId}
      />
      <Continents
        regions={regions}
        currentContinent={currentContinent}
        SortByContinent={SortByContinent}
        SortByRegion={SortByRegion}
        currentRegion={currentRegion}
      />
    </>
  );
}

export default SortListContainer;
