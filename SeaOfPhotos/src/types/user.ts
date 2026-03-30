export type UserResponse = {
  id: string;
  name: string;
  username: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  profile_image: {
    large: string;
    medium: string;
    small: string;
  };
  bio?: string | null;
  location?: string | null;
}

export type User = {
  id: string;
  name: string;
  username: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  profileImage: {
    large: string;
    medium: string;
    small: string;
  };
  bio?: string | null;
  location?: string | null;
}
