import type { Photo } from '@src/types/photo';
import { usePagination } from '@src/hooks/usePagination';
import { PhotoService } from '@src/services';

export function useUserPhotos(username?: string) {
  return usePagination<Photo>({
    queryKey: ['userPhotos', username],
    fetchData: page => PhotoService.fetchUserPhotos(username!, page),
    enabled: Boolean(username),
  });
}
