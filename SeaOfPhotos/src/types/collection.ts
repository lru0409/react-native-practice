export type CollectionResponse = {
  id: string;
  title: string;
  description: string;
  published_at: string;
  last_collected_at: string;
  total_photos: number;
  private: boolean;
  cover_photo: {
    id: string;
    urls: {
      full: string;
      small: string;
    }
  }
}

export type Collection = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  totalPhotos: number;
  private: boolean;
  coverPhoto: {
    id: string;
    urls: {
      full: string;
      small: string;
    }
  }
}