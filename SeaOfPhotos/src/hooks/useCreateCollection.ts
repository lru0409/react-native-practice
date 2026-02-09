import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useUser } from '@src/hooks/useUser';
import CollectionService from '@src/services/collection';

type CreateCollectionParams = {
  title: string;
  description: string;
  isPrivate: boolean;
};

type UseCreateCollectionOptions = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export function useCreateCollection(options?: UseCreateCollectionOptions) {
  const queryClient = useQueryClient();
  const { data: user } = useUser();

  const mutation = useMutation({
    mutationFn: ({ title, description, isPrivate }: CreateCollectionParams) =>
      CollectionService.createCollection(title, description, isPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections', user?.username] });
      options?.onSuccess?.();
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });

  return {
    createCollection: mutation.mutate,
    isPending: mutation.isPending,
  };
}
