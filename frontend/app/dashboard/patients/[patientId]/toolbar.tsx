"use client";

import { useRouter, useSearchParams } from "next/navigation";
import DateRangeToolbar from "@/components/record/date-range-toolbar";
import NewRecordDialog from "@/components/record/new-record-dialog";

export default function Toolbar({ patientId }: { patientId: string }) {
  const router = useRouter();
  const sp = useSearchParams();

  const from = sp.get("from") || undefined;
  const to = sp.get("to") || undefined;

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <DateRangeToolbar
        value={{
          from: from ? new Date(from) : undefined,
          to: to ? new Date(to) : undefined,
        }}
        onChange={(r) => {
          const params = new URLSearchParams(sp);
          r?.from ? params.set("from", r.from.toISOString().slice(0, 10)) : params.delete("from");
          r?.to ? params.set("to", r.to.toISOString().slice(0, 10)) : params.delete("to");
          router.replace(`?${params.toString()}`, { scroll: false });
        }}
      />
      <NewRecordDialog patientId={patientId} />
    </div>
  );
}
