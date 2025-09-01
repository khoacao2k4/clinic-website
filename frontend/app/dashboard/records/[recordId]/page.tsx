"use client";
import PatientCard from "@/components/patient/patient-card";
import { useRecord } from "@/hooks/useRecord";
import { useParams } from "next/navigation";
import React from "react";

export default function RecordPage() {
  const params = useParams();
  const recordId = params.recordId as string;
  const recordQ = useRecord(recordId);
  const patientId = recordQ.data?.patient?.id;
  return (
    <div className="px-4 py-6">
      <div className="grid gap-6 min-[1110px]:grid-cols-[300px_1fr]">
        <PatientCard patientId={patientId} />
        <div className="flex flex-col gap-4 h-dvh">
        </div>
      </div>
    </div>
  );
}
