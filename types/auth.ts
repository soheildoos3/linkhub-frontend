export interface UserRegister {
  name?: string;
  namelink?: string;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface PasswordChange {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}
