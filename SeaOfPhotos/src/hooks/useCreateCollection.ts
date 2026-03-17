import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useMe } from '@src/hooks/useMe';
import { CollectionService } from '@src/services';

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
  const { data: me } = useMe();

  const mutation = useMutation({
    mutationFn: ({ title, description, isPrivate }: CreateCollectionParams) =>
      CollectionService.createCollection(title, description, isPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections', me?.username] });
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
