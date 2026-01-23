export type UserResponse = {
  id: string;
  name: string;
  username: string;
  email: string;
  profile_image: {
    large: string;
    medium: string;
    small: string;
  }
}

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  profileImage: {
    large: string;
    medium: string;
    small: string;
  }
}