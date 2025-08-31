"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { fetchRecordsByPatient } from "@/lib/api";
import RecordGrid from "@/components/record/record-grid";
import { VisitRecord } from "@/utils/db-schema";

export default function RecordsPanel({ patientId }: { patientId: string }) {
  const sp = useSearchParams();
  const fromDate = sp.get("from") || "";
  const toDate = sp.get("to") || "";

  const recordsQ = useQuery({
    queryKey: ["records", patientId, fromDate, toDate],
    queryFn: () => fetchRecordsByPatient(patientId, fromDate, toDate),
    retry: 1,
    staleTime: 60 * 1000, // 1 minute
  });

  return (
    <Card className="p-0 overflow-hidden">
      <RecordGrid
        patientId={patientId}
        records={recordsQ.data as VisitRecord[] || []}
        loading={recordsQ.isLoading}
        refetchRecords={() => recordsQ.refetch()}
      />
    </Card>
  );
}
