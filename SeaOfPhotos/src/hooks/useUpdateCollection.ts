import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useUser } from '@src/hooks/useUser';
import { CollectionService } from '@src/services';

type UpdateCollectionParams = {
  collectionId: string;
  title: string;
  description: string;
  isPrivate: boolean;
};

type UseUpdateCollectionOptions = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export function useUpdateCollection(options?: UseUpdateCollectionOptions) {
  const queryClient = useQueryClient();
  const { data: me } = useUser();

  const mutation = useMutation({
    mutationFn: ({ collectionId, title, description, isPrivate }: UpdateCollectionParams) =>
      CollectionService.updateCollection(collectionId, title, description, isPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['collections', me?.username] });
      options?.onSuccess?.();
    },
    onError: (error: Error) => {
      options?.onError?.(error);
    },
  });

  return {
    updateCollection: mutation.mutate,
    isPending: mutation.isPending,
  };
}
