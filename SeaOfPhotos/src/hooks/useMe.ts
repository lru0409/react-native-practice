import { useQuery } from '@tanstack/react-query';
import { MeService } from '@src/services';

export function useMe() {
  return useQuery({
    queryKey: ['me'],
    queryFn: MeService.fetchMe,
  });
}
 