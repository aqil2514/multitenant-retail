import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ storeSlug: string }>;
}

export default async function GeneralPage({ params }: Props) {
  const { storeSlug } = await params;

  return redirect(`/${storeSlug}/dashboard`);
}
