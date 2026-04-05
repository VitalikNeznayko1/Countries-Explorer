import { useState, useMemo } from "react";


export default function usePagination(data, itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("pageNum")) || 1,
  );

  const [sortedData, setSortedData] = useState([]);

  const list = sortedData.length === 0 ? data : sortedData;

  const totalPages = Math.ceil(list.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const last = currentPage * itemsPerPage;
    const first = last - itemsPerPage;
    return list.slice(first, last);
  }, [list, currentPage, itemsPerPage]);

  const changePage = (e, page) => {
    sessionStorage.setItem("pageNum", page);
    setCurrentPage(page);
  };

  return {
    currentPage,
    setCurrentPage,
    sortedData,
    setSortedData,
    currentItems,
    totalPages,
    changePage,
  };
}