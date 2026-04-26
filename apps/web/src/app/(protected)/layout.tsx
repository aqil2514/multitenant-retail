import { getAuth } from "@/lib/get-auth";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import React from "react";
import { getUserStores } from "@/lib/get-user-stores";
import { headers } from "next/headers";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  const header = await headers();
  const pathname = header.get("x-pathname");

  try {
    const userData = await queryClient.fetchQuery({
      queryKey: ["user"],
      queryFn: getAuth,
    });

    if (!userData) {
      redirect("/login");
    }
  } catch {
    redirect("/login");
  }

  if (pathname !== "/onboarding") {
    const userStore = await getUserStores();
    if (!userStore || userStore.length === 0) redirect("/onboarding");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
