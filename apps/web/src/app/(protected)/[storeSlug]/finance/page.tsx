import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ storeSlug: string }>;
}

export default async function FinancePage({ params }: Props) {
  const { storeSlug } = await params;

  return redirect(`/${storeSlug}/finance/accounts`);
}
