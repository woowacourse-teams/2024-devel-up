import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const GROUP_SIZE = 5;

export function usePagination() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    return parseInt(searchParams.get('page') || '1', 10);
  });
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageFromURL = parseInt(searchParams.get('page') || '1', 10);
    if (pageFromURL !== currentPage) {
      setCurrentPage(pageFromURL);
    }
  }, [location.search, currentPage]);

  const goToPage = useCallback(
    (page: number) => {
      const newPage = Math.max(1, Math.min(page, totalPages));
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('page', newPage.toString());
      navigate(`${location.pathname}?${searchParams.toString()}`);
      setCurrentPage(newPage);
    },
    [navigate, location.pathname, totalPages],
  );

  const currentGroup = useMemo(() => Math.floor((currentPage - 1) / GROUP_SIZE), [currentPage]);

  const goToPreviousGroup = useCallback(() => {
    if (currentGroup > 0) {
      goToPage(currentGroup * GROUP_SIZE);
    }
  }, [currentGroup, goToPage]);

  const goToNextGroup = useCallback(() => {
    if ((currentGroup + 1) * GROUP_SIZE < totalPages) {
      goToPage((currentGroup + 1) * GROUP_SIZE + 1);
    }
  }, [currentGroup, totalPages, goToPage]);

  const pageNumbers = useMemo(() => {
    const start = currentGroup * GROUP_SIZE + 1;
    const end = Math.min(start + GROUP_SIZE - 1, totalPages);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentGroup, totalPages]);

  const handleInitializePage = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', '1');
    navigate(`${location.pathname}?${searchParams.toString()}`);
    setCurrentPage(1);
  }, [navigate, location.pathname, location.search]);

  return {
    currentPage,
    totalPages,
    setTotalPages,
    goToPage,
    goToPreviousGroup,
    goToNextGroup,
    pageNumbers,
    hasPreviousGroup: currentGroup > 0,
    hasNextGroup: (currentGroup + 1) * GROUP_SIZE < totalPages,
    handleInitializePage,
  };
}
