import { createContext, useContext, useState } from 'react';

import { Photo } from '@src/types/photo';
import { CollectionPickerSheet } from '@src/components';

type CollectionMembershipContextType = {
  openPicker: (photo: Photo) => void;
  getCollectionIds: (photoId?: string) => string[] | null;
  getIsPhotoInCollection: (photo: Photo) => boolean;
  addCollectionId: (photoId: string, collectionId: string) => void;
  removeCollectionId: (photoId: string, collectionId: string) => void;
};

const CollectionMembershipContext = createContext<CollectionMembershipContextType | null>(null);

export function CollectionMembershipProvider({ children }: { children: React.ReactNode }) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [collectionIdsByPhotoId, setCollectionIdsByPhotoId] = useState<Record<string, string[]>>({});

  const openPicker = (photo: Photo) => {
    setCollectionIdsByPhotoId(prev => {
      if (prev[photo.id] !== undefined) return prev;
      return { ...prev, [photo.id]: photo.currentUserCollections.map(c => c.id) };
    });
    setSelectedPhoto(photo);
  };

  const getCollectionIds = (photoId?: string): string[] | null =>
    photoId ? (collectionIdsByPhotoId[photoId] ?? null) : null;

  const getIsPhotoInCollection = (photo: Photo): boolean => {
    const ids = collectionIdsByPhotoId[photo.id];
    if (ids !== undefined) {
      return ids.length > 0;
    }
    return photo.currentUserCollections.length > 0;
  }

  const addCollectionId = (photoId: string, collectionId: string) =>
    setCollectionIdsByPhotoId(prev => ({ ...prev, [photoId]: [...(prev[photoId] ?? []), collectionId] }));

  const removeCollectionId = (photoId: string, collectionId: string) =>
    setCollectionIdsByPhotoId(prev => ({ ...prev, [photoId]: (prev[photoId] ?? []).filter(id => id !== collectionId) }));

  return (
    <CollectionMembershipContext.Provider value={{ openPicker, getCollectionIds, getIsPhotoInCollection, addCollectionId, removeCollectionId }}>
      {children}
      <CollectionPickerSheet
        visible={selectedPhoto !== null}
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </CollectionMembershipContext.Provider>
  );
}

export function useCollectionMembership() {
  const context = useContext(CollectionMembershipContext);
  if (!context) {
    throw new Error('useCollectionMembership must be used within a CollectionMembershipProvider');
  }
  return context;
}
