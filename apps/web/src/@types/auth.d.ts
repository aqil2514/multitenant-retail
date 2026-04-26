export interface UserJwtPayload {
  sub: string;
  email: string;
}

export interface UserHeader {
  name: string;
  email: string;
  role: string;
  picture: string;
}
