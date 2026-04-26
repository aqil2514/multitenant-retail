export interface UserProfile {
  provider: string;
  providerId: string;
  email: string;
  name: string;
  picture: string;
}

export interface GoogleProfile {
  provider: 'google';
  sub: string;
  id: string;
  displayName: string;
  name: {
    givenName: string;
    familyName: string;
  };
  given_name: string;
  family_name: string;
  email_verified: boolean;
  verified: boolean;
  email: string;
  emails: Array<{
    value: string;
    type?: string;
  }>;
  photos: Array<{
    value: string;
    type?: string;
  }>;
  picture: string;
  _raw: string;
  _json: {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    domain?: string;
  };
}

export interface UserJwtPayload {
  sub: string;
  email: string;
}
