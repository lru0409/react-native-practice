export type PhotoResponse = {
  id: string;
  alt_description: string;
  created_at: string;
  urls: {
    full: string;
    small: string;
  };
  user: {
    name: string;
    profile_image: {
      medium: string;
    };
  };
};

export type Photo = {
  id: string;
  description: string;
  createdAt: string;
  urls: {
    full: string;
    small: string;
  };
  user: {
    name: string;
    profileImage: string;
  };
};