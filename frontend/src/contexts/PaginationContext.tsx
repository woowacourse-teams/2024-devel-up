import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { PropsWithChildren } from 'react';

export const DEFAULT_PAGE_SIZE = 9;
const GROUP_SIZE = 5;

interface PaginationContextType {
  currentPage: number;
  totalPages: number;
  updatePageInfo: (current: number, total: number) => void;
  goToPage: (page: number) => void;
  goToPreviousGroup: () => void;
  goToNextGroup: () => void;
  pageNumbers: number[];
  hasPreviousGroup: boolean;
  hasNextGroup: boolean;
}

const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

export function PaginationProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const location = useLocation();
  const [pageInfo, setPageInfo] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    return { currentPage, totalPages: 1 };
  });

  const updateURLRef = useRef((page: number) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', page.toString());
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageFromURL = parseInt(searchParams.get('page') || '1', 10);
    if (pageFromURL !== pageInfo.currentPage) {
      setPageInfo((prev) => ({ ...prev, currentPage: pageFromURL }));
    }
  }, [location.search, pageInfo.currentPage]);

  const updatePageInfo = useCallback((current: number, total: number) => {
    setPageInfo((prev) => {
      if (prev.currentPage !== current || prev.totalPages !== total) {
        updateURLRef.current(current);
        return { currentPage: current, totalPages: total };
      }
      return prev;
    });
  }, []);

  const goToPage = useCallback(
    (page: number) => {
      const newPage = Math.max(1, Math.min(page, pageInfo.totalPages));
      updatePageInfo(newPage, pageInfo.totalPages);
    },
    [pageInfo.totalPages, updatePageInfo],
  );

  const currentGroup = Math.floor((pageInfo.currentPage - 1) / GROUP_SIZE);

  const goToPreviousGroup = useCallback(() => {
    if (currentGroup > 0) {
      const newPage = currentGroup * GROUP_SIZE;
      goToPage(newPage);
    }
  }, [currentGroup, goToPage]);

  const goToNextGroup = useCallback(() => {
    if ((currentGroup + 1) * GROUP_SIZE < pageInfo.totalPages) {
      const newPage = (currentGroup + 1) * GROUP_SIZE + 1;
      goToPage(newPage);
    }
  }, [currentGroup, pageInfo.totalPages, goToPage]);

  const pageNumbers = useMemo(() => {
    const start = currentGroup * GROUP_SIZE + 1;
    const end = Math.min(start + GROUP_SIZE - 1, pageInfo.totalPages);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentGroup, pageInfo.totalPages]);

  const contextValue = useMemo(
    () => ({
      currentPage: pageInfo.currentPage,
      totalPages: pageInfo.totalPages,
      updatePageInfo,
      goToPage,
      goToPreviousGroup,
      goToNextGroup,
      pageNumbers,
      hasPreviousGroup: currentGroup > 0,
      hasNextGroup: (currentGroup + 1) * GROUP_SIZE < pageInfo.totalPages,
    }),
    [
      pageInfo,
      updatePageInfo,
      goToPage,
      goToPreviousGroup,
      goToNextGroup,
      pageNumbers,
      currentGroup,
    ],
  );

  return <PaginationContext.Provider value={contextValue}>{children}</PaginationContext.Provider>;
}

export const usePagination = () => {
  const context = useContext(PaginationContext);
  if (context === undefined) {
    throw new Error('usePagination은 Provider가 정의되어야해요! ');
  }
  return context;
};
