import type { Collection } from '@src/types/collection';
import { usePagination } from '@src/hooks/usePagination';
import { CollectionService } from '@src/services';

export function useUserCollections(username?: string) {
  return usePagination<Collection>({
    queryKey: ['collections', username],
    fetchData: page => CollectionService.fetchUserCollections(username!, page),
    enabled: Boolean(username),
  });
}
