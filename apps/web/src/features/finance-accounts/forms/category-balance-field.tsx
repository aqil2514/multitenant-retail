import { Info } from "lucide-react";
import { AccountCategory, NormalBalance } from "../interfaces/fa.interface";
import { FormFieldSelect } from "@/_shared/forms";
import { UseFormReturn, useWatch } from "react-hook-form";
import { FinanceAccountInput, FinanceAccountOutput } from "./fa.schema";
import React from "react";

interface Props {
  form: UseFormReturn<FinanceAccountInput, unknown, FinanceAccountOutput>;
}
export function CategoryAndNormalBalanceField({ form }: Props) {
  const category = useWatch({ control: form.control, name: "category" });
  const normalBalance = useWatch({
    control: form.control,
    name: "normalBalance",
  });
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormFieldSelect
          form={form}
          name="category"
          label="Kategori"
          options={[
            { label: "Asset", value: AccountCategory.ASSET },
            { label: "Liability", value: AccountCategory.LIABILITY },
            { label: "Equity", value: AccountCategory.EQUITY },
            { label: "Revenue", value: AccountCategory.REVENUE },
            { label: "Expense", value: AccountCategory.EXPENSE },
          ]}
        />
        <FormFieldSelect
          form={form}
          name="normalBalance"
          label="Saldo Normal"
          options={[
            { label: "Debit", value: NormalBalance.DEBIT },
            { label: "Kredit", value: NormalBalance.CREDIT },
          ]}
        />
      </div>

      {category && normalBalance && (
        <AccountBehaviorDescription
          category={category as AccountCategory}
          balance={normalBalance as NormalBalance}
        />
      )}
    </div>
  );
}

interface BehaviorProps {
  category: AccountCategory;
  balance: NormalBalance;
}

const AccountBehaviorDescription: React.FC<BehaviorProps> = ({
  category,
  balance,
}) => {
  const getExplanation = () => {
    const isDebit = balance === NormalBalance.DEBIT;

    const descriptions: Record<AccountCategory, string> = {
      [AccountCategory.ASSET]: isDebit
        ? "Nilai aset (seperti kas atau stok) akan bertambah jika dicatat di DEBIT."
        : "PERINGATAN: Umumnya aset bertambah di DEBIT. Memilih KREDIT akan mengurangi nilai aset secara default.",

      [AccountCategory.LIABILITY]: !isDebit
        ? "Kewajiban (seperti hutang) akan bertambah jika dicatat di KREDIT."
        : "PERINGATAN: Umumnya hutang bertambah di KREDIT. Memilih DEBIT akan mengurangi nilai hutang.",

      [AccountCategory.EQUITY]: !isDebit
        ? "Modal pemilik akan bertambah jika dicatat di sisi KREDIT."
        : "Memilih DEBIT biasanya digunakan untuk penarikan modal (Prive).",

      [AccountCategory.REVENUE]: !isDebit
        ? "Pendapatan dari penjualan akan bertambah jika dicatat di KREDIT."
        : "PERINGATAN: Pendapatan hampir selalu bertambah di KREDIT.",

      [AccountCategory.EXPENSE]: isDebit
        ? "Beban atau biaya operasional akan bertambah jika dicatat di DEBIT."
        : "PERINGATAN: Beban hampir selalu bertambah di DEBIT.",
    };

    return descriptions[category];
  };

  return (
    <div className="flex items-start gap-2 p-3 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
      <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
      <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
        {getExplanation()}
      </p>
    </div>
  );
};
