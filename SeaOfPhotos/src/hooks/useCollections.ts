import { useQuery } from '@tanstack/react-query';
import CollectionService from '@src/services/collection';

export function useCollections(username: string, page = 1) {
  return useQuery({
    queryKey: ['collections', username, page],
    queryFn: () => CollectionService.fetchUserCollections(username, page),
    enabled: !!username,
  })
}
