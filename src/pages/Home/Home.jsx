import { useEffect, useState } from "react";
import CountriesList from "../../components/CountriesList/CountriesList";
import Header from "../../components/Headers/Header";
import countryApi from "../../api/countryApi";
import StyledPagination from "../../components/StyledPagination/StyledPagination";
import styles from "./Home.module.css";
import SortListContainer from "../../components/SortList/SortListContainer";

function Home() {
  const [allCountry, setAllCountry] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("pageNum")),
  );
  const [sortedCountry, setSortedCountry] = useState([]);
  const [countItems] = useState(10);
  const [countSiblings, setCountSiblings] = useState(getCountSiblings());

  function getCountSiblings() {
    return document.documentElement.clientWidth <= 750 ? 1 : 2;
  }

  const allPage = Math.ceil(sortedCountry.length / countItems);
  const lastCountryIndex = currentPage * countItems;
  const firstCountryIndex = lastCountryIndex - countItems;
  const currentCountry = sortedCountry.slice(
    firstCountryIndex,
    lastCountryIndex,
  );

  const nextListPage = (e, p) => {
    sessionStorage.setItem("pageNum", p);
    setCurrentPage(p);
  };

  useEffect(() => {
    if (sortedCountry.length === 0) {
      setSortedCountry(allCountry);
    }
  }, [sortedCountry, allCountry]);

  useEffect(() => {
    const handleResize = () => {
      setCountSiblings(getCountSiblings());
    };

    addEventListener("resize", handleResize);

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const result = await countryApi.getAll();

        const resultAddId = result.data.map((item, i) => ({
          ...item,
          id: i + 1,
        }));

        setAllCountry(resultAddId);
        setSortedCountry(resultAddId);
      } catch (error) {
        console.error(error);
        setAllCountry([]);
      }
    };

    fetchCountryData();
  }, []);

  if (allCountry.length === 0) return <div>Loading...</div>;
  return (
    <>
      <Header title="Countries list" searchable allCountry={allCountry} />
      <div className={styles.center_info}>
        <CountriesList contriesOnPage={currentCountry} />
        <div className={styles.container_filter}>
          <SortListContainer
            allCountry={allCountry}
            sortedCountry={sortedCountry}
            setSortedCountry={setSortedCountry}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      <div className={styles.pagination_box}>
        <StyledPagination
          count={allPage}
          page={currentPage}
          variant="outlined"
          shape="rounded"
          size={
            document.documentElement.clientWidth <= 750 ? "medium" : "large"
          }
          onChange={nextListPage}
          siblingCount={countSiblings}
        ></StyledPagination>
      </div>
    </>
  );
}

export default Home;
