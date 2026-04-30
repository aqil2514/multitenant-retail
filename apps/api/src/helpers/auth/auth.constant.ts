import { CookieOptions } from 'express';

const BASE_COOKIE_CONFIG: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
};

const ACCESS_TOKEN_EXPIRES = 15 * 60; // 15 menit dalam detik
const REFRESH_TOKEN_EXPIRES = 7 * 24 * 60 * 60; // 7 hari dalam detik

export const accessTokenCookieConfig: CookieOptions = {
  ...BASE_COOKIE_CONFIG,
  maxAge: ACCESS_TOKEN_EXPIRES * 1000, // maxAge dalam milidetik
};

export const refreshTokenCookieConfig: CookieOptions = {
  ...BASE_COOKIE_CONFIG,
  maxAge: REFRESH_TOKEN_EXPIRES * 1000,
  path: '/', // ← hanya dikirim ke endpoint refresh saja
};
