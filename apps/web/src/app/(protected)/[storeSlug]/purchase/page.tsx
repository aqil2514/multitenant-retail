import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ storeSlug: string }>;
}

export default async function PurchasePage({ params }: Props) {
  const { storeSlug } = await params;

  return redirect(`/${storeSlug}/purchase/suppliers`);
}
