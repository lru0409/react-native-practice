import { useQuery } from '@tanstack/react-query';
import { MeService, UserService } from '@src/services';

export function useUser(username?: string) {
  const isMe = !username;

  return useQuery({
    queryKey: isMe ? ['me'] : ['user', username],
    queryFn: () => (isMe ? MeService.fetchMe() : UserService.fetchUser(username)),
  });
}
