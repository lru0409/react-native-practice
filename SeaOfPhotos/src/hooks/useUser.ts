import { useQuery } from '@tanstack/react-query';
import { UserService } from '@src/services';

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: UserService.fetchUser,
  });
}
 