import { useQuery } from '@tanstack/react-query';
import { MeService } from '@src/services';

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: MeService.fetchMe,
  });
}
 