import { getUserStores } from "@/lib/get-user-stores";
import { NextResponse } from "next/server";

export async function GET() {
  const stores = await getUserStores();
  return NextResponse.json(stores);
}
