import { getAuth } from "@/lib/get-auth";
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
      redirect("/dashboard");
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
