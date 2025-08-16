import { notFound } from "next/navigation";
import { Suspense } from "react";
import PatientCard from "./patientCard"; // client or server (no hooks => server)
import Toolbar from "./toolbar"; // client (date-range + new record)
import RecordsTable from "./_ui/records-table"; // client (actions, delete)
import { cookies, headers } from "next/headers";
import { fetchPatientDetails } from "@/lib/api";

export default async function Page({
  params,
  searchParams,
}: {
  params: { patientId: string };
  searchParams: { from?: string; to?: string };
}) {
  return (
    <div className="max-w-6xl px-4 py-6">
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <PatientCard
          patientId={params.patientId}
        />
        <div className="flex flex-col gap-4">
        <Toolbar patientId={params.patientId} />
        </div>
      </div>
    </div>
  );
}
