import { useQuery } from '@tanstack/react-query';
import UserService from '@src/services/user';

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    // TODO: 이렇게 하면 try-catch는 어떻게 처리하지?
    queryFn: UserService.fetchUser,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchInterval: false,
  });
}
