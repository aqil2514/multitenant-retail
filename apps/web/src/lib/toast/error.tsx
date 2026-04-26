import { isAxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    const data = error.response?.data;
    const message = data?.message;

    if (Array.isArray(message)) {
      return message[0];
    }

    if (typeof message === 'string') {
      return message;
    }

    return data?.error || "Terjadi kesalahan pada server";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Terjadi kesalahan sistem";
};