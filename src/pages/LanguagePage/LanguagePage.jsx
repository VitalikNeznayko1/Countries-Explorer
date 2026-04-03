import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import CountriesList from "../../components/CountriesList/CountriesList";
import SortList from "../../components/SortList/SortList";
import Header from "../../components/Headers/HeaderHome/HeaderHome";
import StyledPagination from "../../components/Pagination/Pagination";
import countryApi from "../../api/countryApi";
import styles from "./LanguagePage.module.css";

function LanguagePage() {
  const { language } = useParams();
  const navigate = useNavigate();

  const [allCountry, setAllCountry] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("pageNum"))
  );
  const [languageName, setLanguageName] = useState("");
  const [sortedCountry, setSortedCountry] = useState([]);
  const [countItems] = useState(10);

  const allPage =
    sortedCountry.length === 0
      ? Math.ceil(allCountry.length / countItems)
      : Math.ceil(sortedCountry.length / countItems);

  const lastCountryIndex = currentPage * countItems;
  const firstCountryIndex = lastCountryIndex - countItems;
  const currentCountry = (
    sortedCountry.length === 0 ? allCountry : sortedCountry
  ).slice(firstCountryIndex, lastCountryIndex);

  const nextListPage = (e, p) => {
    sessionStorage.setItem("pageNum", p);
    setCurrentPage(p);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await countryApi.getByLanguage(language);

        const resultId = result.data.map((item, i) => ({
          ...item,
          id: i + 1,
        }));

        const filteredCountry = resultId.filter(
          (country) => country.languages && country.languages[language]
        );

        setLanguageName(filteredCountry[0]?.languages[language] ?? "");
        setAllCountry(filteredCountry);
        setSortedCountry([]);
        setCurrentPage(1);
      } catch {
        setAllCountry([]);
      }
    };

    fetchData();
  }, [language]);

  return (
    <>
      <Header
        allCountry={allCountry}
        headerText={`Language: ${languageName.toUpperCase()}`}
      />
      <div className={styles.button_back}>
        <button
          className={styles.button}
          onClick={() => navigate(-1)}
        >{`Back`}</button>
        <Link key="Back to list" className={styles.button} to="/">
          <button>Back to list</button>
        </Link>
      </div>
      <div className={styles.center_info}>
        <CountriesList contriesOnPage={currentCountry} />
        <SortList
          allCountry={allCountry}
          sortedCountry={sortedCountry}
          setSortedCountry={setSortedCountry}
          setCurrentPage={setCurrentPage}
        ></SortList>
        <div className={styles.pagination_box}>
          <StyledPagination
            count={allPage}
            page={currentPage}
            variant="outlined"
            shape="rounded"
            size="large"
            onChange={nextListPage}
            siblingCount={2}
          ></StyledPagination>
        </div>
      </div>
    </>
  );
}

export default LanguagePage;
