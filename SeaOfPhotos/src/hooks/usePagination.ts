import { useState, useRef } from 'react';

type UsePaginationProps<T> = {
  fetchData: (page: number) => Promise<{ data: T[], hasMore: boolean }>;
};

const usePagination = <T>({ fetchData }: UsePaginationProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [isFirstFetching, setIsFirstFetching] = useState<boolean>(true); // 첫 페이지 fetching 중
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false); // 두 번째 이상의 페이지 로딩 중
  const isFetchingMoreRef = useRef<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const pageRef = useRef<number>(1);

  const firstFetch = async () => {
    setIsFirstFetching(true);
    const result = await fetchData(pageRef.current);
    setData(result.data);
    setHasMore(result.hasMore);
    setIsFirstFetching(false);
  }

  const loadMore = async () => {
    if (!hasMore || isFetchingMoreRef.current) {
      return;
    }

    isFetchingMoreRef.current = true;
    setIsFetchingMore(true);

    pageRef.current += 1;
    const result = await fetchData(pageRef.current);
    setData(prev => [...prev, ...result.data]);
    setHasMore(result.hasMore);

    isFetchingMoreRef.current = false;
    setIsFetchingMore(false);
  };

  return {
    data,
    isFirstFetching,
    isFetchingMore,
    firstFetch,
    loadMore,
  }
};

export default usePagination;
