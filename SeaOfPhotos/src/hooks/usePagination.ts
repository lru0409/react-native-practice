import { useInfiniteQuery } from '@tanstack/react-query';

type UsePaginationProps<T> = {
  queryKey: unknown[];
  fetchData: (page: number) => Promise<{ data: T[]; hasMore: boolean }>;
  enabled?: boolean;
};

export function usePagination<T>({
  queryKey,
  fetchData,
  enabled = true,
}: UsePaginationProps<T>) {
  const result = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => fetchData(pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length + 1 : undefined,
    initialPageParam: 1,
    enabled,
  });

  const data = result.data?.pages.flatMap((p) => p.data) ?? [];

  const loadMore = () => {
    if (result.isFetchingNextPage || !result.hasNextPage) return;
    result.fetchNextPage();
  };

  return {
    data,
    isFetchingFirst: result.isLoading,
    isFetchingMore: result.isFetchingNextPage,
    hasNextPage: result.hasNextPage ?? false,
    isError: result.isError,
    error: result.error,
    loadMore,
    refetch: result.refetch,
  };
}
