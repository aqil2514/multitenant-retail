import { format } from "date-fns";
import { id } from "date-fns/locale";

type FormatStringKey =
  | "Senin, 29 Desember 2025, 09:21"
  | "29 Desember 2025"
  | "29 Des 2025"
  | "29/12/2025"
  | "29-12-2025 09:21"
  | "Desember 2025"
  | "09:21"
  | "29 Des 2025, 09:21 WIB"
  | "29 Desember 2025, 09:21 WIB"
  | "Senin, 29 Desember 2025";

const formatStrMap: Record<FormatStringKey, string> = {
  "Senin, 29 Desember 2025, 09:21": "EEEE, dd MMMM yyyy, HH:mm",
  "Senin, 29 Desember 2025": "EEEE, dd MMMM yyyy",
  "29 Desember 2025": "dd MMMM yyyy",
  "29 Des 2025": "dd MMM yyyy",
  "29/12/2025": "dd/MM/yyyy",
  "29-12-2025 09:21": "dd-MM-yyyy HH:mm",
  "Desember 2025": "MMMM yyyy",
  "09:21": "HH:mm",
  "29 Des 2025, 09:21 WIB": "dd MMM yyyy, HH:mm 'WIB'",
  "29 Desember 2025, 09:21 WIB": "dd MMMM yyyy, HH:mm 'WIB'",
};

export function formatDate(date: Date | string, formatString: FormatStringKey) {
  // Mengonversi string ke Date dengan cara yang lebih aman
  const dateObj = typeof date === "string" ? new Date(date) : date;

  // Cek apakah date valid untuk menghindari "Invalid Date"
  if (isNaN(dateObj.getTime())) {
    return "-"; // Atau handle error sesuai kebutuhan
  }

  return format(dateObj, formatStrMap[formatString], { locale: id });
}
