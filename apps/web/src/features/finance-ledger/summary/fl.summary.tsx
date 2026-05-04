import { useFinanceLedger } from "../fl.context";

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export function FinanceLedgerSummary() {
  const { data } = useFinanceLedger();
  const summary = data?.summary;

  const items = [
    { label: "Saldo Awal", value: summary?.openingBalance ?? 0 },
    { label: "Total Debit", value: summary?.totalDebit ?? 0 },
    { label: "Total Kredit", value: summary?.totalCredit ?? 0 },
    { label: "Saldo Akhir", value: summary?.closingBalance ?? 0 },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {items.map((item) => (
        <div key={item.label} className="border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">{item.label}</p>
          <p className="text-2xl font-semibold mt-1">
            {formatRupiah(item.value)}
          </p>
        </div>
      ))}
    </div>
  );
}
