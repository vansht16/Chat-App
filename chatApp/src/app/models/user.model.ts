export interface UserInterface {
  valid: Boolean;
  user: {
    username: string;
    password: string;
    email: string;
    id: number;
    roles: [];
    groups: [];
  };
}