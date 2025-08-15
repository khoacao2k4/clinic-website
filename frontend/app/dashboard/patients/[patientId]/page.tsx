// app/dashboard/patients/[patientId]/page.tsx  (SERVER COMPONENT)
import { notFound } from "next/navigation";
import { Suspense } from "react";
import PatientCard from "./patientCard";          // client or server (no hooks => server)
import Toolbar from "./_ui/toolbar";                   // client (date-range + new record)
import RecordsTable from "./_ui/records-table";        // client (actions, delete)
import { cookies, headers } from "next/headers";
import { fetchPatientDetails } from "@/lib/api";

export default async function Page({ params, searchParams }: {
  params: { patientId: string };
  searchParams: { from?: string; to?: string };
}) {
  const { patientId } = params;
  const { from = "", to = "" } = searchParams;

  const patientDetails = await fetchPatientDetails(patientId);
  const {records, ...patient } = patientDetails

  console.log(records);

  const lastVisitString = records.length > 0 ? new Date(records[0].visitDate).toLocaleDateString('en-GB') : "—";

  if (!patient) 
    notFound();

  return (
    <div className="max-w-6xl px-4 py-6">
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        <PatientCard patient={patient} totalVisits={records.length} lastVisit={lastVisitString} />
      </div>
    </div>
  );
}
