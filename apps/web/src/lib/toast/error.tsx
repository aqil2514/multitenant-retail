import { isAxiosError } from "axios";

export interface ConflictError<T = unknown> {
  message: string;
  data: T;
}

export function isConflictError<T>(
  error: unknown,
  validator: (data: unknown) => data is T,
): error is { response: { data: ConflictError<T> } } {
  if (!isAxiosError(error)) return false;
  const data = error.response?.data;
  return typeof data?.message === "string" && validator(data?.data);
}

export function getConflictError<T>(
  error: unknown,
  validator: (data: unknown) => data is T,
): T | null {
  if (!isConflictError(error, validator)) return null;
  return error.response.data.data;
}

export const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    const data = error.response?.data;
    const message = data?.message;

    if (Array.isArray(message)) {
      return message[0];
    }

    if (typeof message === "string") {
      return message;
    }

    return data?.error || "Terjadi kesalahan pada server";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Terjadi kesalahan sistem";
};
