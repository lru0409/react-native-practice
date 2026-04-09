import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useUser } from '@src/hooks/useUser';
import { CollectionService } from '@src/services';

type DeleteCollectionParams = {
  collectionId: string;
};

type UseDeleteCollectionOptions = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export function useDeleteCollection(options?: UseDeleteCollectionOptions) {
  const queryClient = useQueryClient();
  const { data: me } = useUser();

  const mutation = useMutation({
    mutationFn: ({ collectionId }: DeleteCollectionParams) =>
      CollectionService.deleteCollection(collectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections', me?.username] });
      options?.onSuccess?.();
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });

  return {
    deleteCollection: mutation.mutate,
    isPending: mutation.isPending,
  };
}
