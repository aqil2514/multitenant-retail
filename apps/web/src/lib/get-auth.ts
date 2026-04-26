import { cookies } from "next/headers";
import { api } from "./api";
import { UserJwtPayload } from "@/@types/auth";

export async function getAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) return null;

  try {
    const { data } = await api.get<UserJwtPayload>("/auth/me", {
      headers: {
        Cookie: `access_token=${token}`,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
