import { getAuth } from "@/lib/get-auth";
import { getUserStores } from "@/lib/get-user-stores";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import React from "react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  try {
    const userData = await queryClient.fetchQuery({
      queryKey: ["user"],
      queryFn: getAuth,
    });

    if (userData) {
      const userStore = await getUserStores();
      if (!userStore || userStore.length === 0) redirect("/onboarding");
      redirect(`/${userStore[0].slug}/dashboard`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
