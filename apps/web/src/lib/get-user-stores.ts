import { cookies } from "next/headers";
import { api } from "./api";

export async function getUserStores() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) return null;

  try {
    const { data } = await api.get<{ id: string; name: string }[]>(
      "/auth/store",
      {
        headers: {
          Cookie: `access_token=${token}`,
        },
      },
    );

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
