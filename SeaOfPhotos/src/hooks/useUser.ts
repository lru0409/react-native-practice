import { useQuery } from '@tanstack/react-query';
import { UserService } from '@src/services';

export function useUser(username?: string) {
  const isMe = !username;

  return useQuery({
    queryKey: isMe ? ['me'] : ['user', username],
    queryFn: () => (isMe ? UserService.fetchMe() : UserService.fetchUser(username)),
  });
}
