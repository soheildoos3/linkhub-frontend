export interface User {
  id: number;
  name: string;
  namelink: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string | null;
}

export interface UserUpdate {
  name?: string;
  namelink?: string;
  username?: string;
  email?: string;
}
