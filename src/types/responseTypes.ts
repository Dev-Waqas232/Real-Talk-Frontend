export interface ApiResponse<T = undefined> {
  message: string;
  ok: boolean;
  data: T;
}

export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
};

export interface AuthResponse {
  user: User;
  token: string;
}
