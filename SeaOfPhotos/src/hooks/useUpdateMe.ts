import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MeService } from '@src/services';

type UpdateMeParams = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  bio: string;
};

type UseUpdateMeOptions = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export function useUpdateMe(options?: UseUpdateMeOptions) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (params: UpdateMeParams) => MeService.updateMe(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
      options?.onSuccess?.();
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });

  return {
    updateMe: mutation.mutate,
    isPending: mutation.isPending,
  };
}
