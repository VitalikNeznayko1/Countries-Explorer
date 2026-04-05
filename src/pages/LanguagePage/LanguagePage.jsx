import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CountriesList from "../../components/CountriesList/CountriesList";
import StyledPagination from "../../components/StyledPagination/StyledPagination";
import countryApi from "../../api/countryApi";
import styles from "./LanguagePage.module.css";
import SortListContainer from "../../components/SortList/SortListContainer";
import Header from "../../components/Headers/Header";
import usePagination from "../../hooks/usePagination";

function LanguagePage() {
  const { language } = useParams();

  const [allCountry, setAllCountry] = useState([]);
  const [languageName, setLanguageName] = useState("");

  const {
    currentPage,
    setCurrentPage,
    sortedData,
    setSortedData,
    currentItems,
    totalPages,
    changePage,
  } = usePagination(allCountry, 10);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await countryApi.getByLanguage(language);

        const resultId = result.data.map((item, i) => ({
          ...item,
          id: i + 1,
        }));

        const filteredCountry = resultId.filter(
          (country) => country.languages && country.languages[language],
        );

        setLanguageName(filteredCountry[0]?.languages[language] ?? "");
        setAllCountry(filteredCountry);
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
        title={`Language: ${languageName}`}
        showBack
        searchable
        allCountry={currentItems}
      />
      <div className={styles.center_info}>
        <CountriesList contriesOnPage={currentItems} />
        <div className={styles.container_filter}>
          <SortListContainer
            allCountry={allCountry}
            sortedCountry={sortedData}
            setSortedCountry={setSortedData}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div className={styles.pagination_box}>
          <StyledPagination
            count={totalPages}
            page={currentPage}
            onChange={changePage}
            variant="outlined"
            shape="rounded"
            size="large"
            siblingCount={2}
          ></StyledPagination>
        </div>
      </div>
    </>
  );
}

export default LanguagePage;
