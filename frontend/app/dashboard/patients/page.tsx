"use client";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/columns";
import { Patient } from "@/utils/patient-schema";
import { AddPatientModal } from "@/components/add-patient-modal";
import { useCallback, useEffect, useState } from "react";
import { fetchPatients } from "@/lib/api";


export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);

  const load = useCallback(async () => {
    const data = await fetchPatients();
    setPatients(data);
  }, []);

  useEffect(() => { 
    load().catch(console.error); 
  }, [load]);

  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col gap-4 my-auto">
      {/* Page header (will take its natural height) */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Patients ({patients.length})
          </h1>
          <p className="text-muted-foreground">
            Manage your patient records 👩‍⚕️
          </p>
        </div>
        <AddPatientModal onCreated={load} />
      </div>
      <div className="flex-1 overflow-hidden pb-2">
        <DataTable searchKey="name" columns={columns} data={patients} />
      </div>
    </div>
  );
}