"use client";
import { DataTable } from "@/components/ui/data-table";
import { baseColumns } from "@/components/patient/columns";
import { Patient } from "@/utils/patient-schema";
import { AddPatientModal } from "@/components/patient/add-patient-modal";
import { useCallback, useEffect, useState } from "react";
import { fetchPatients } from "@/lib/api";
import { CellAction } from "@/components/patient/cell-action";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { toast } from "sonner";


export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);

  const load = useCallback(async () => {
    try {
      const data = await fetchPatients();
      setPatients(data);
      return true;
    } catch (error) {
      toast.error("Failed to fetch patients. Please try again.");
      console.error(error);
      return false;
    }
  }, []);

  useEffect(() => { 
    load().catch(console.error); 
  }, [load]);

  const columns: ColumnDef<Patient>[] = [
    ...baseColumns,
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <CellAction data={row.original} onUpdated={load} />
      ),
    },
  ];

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
        <div className="flex items-center gap-2">
          <AddPatientModal onCreated={load} />
          <Button onClick={async () => {
            toast.info("Refreshing...");
            const success = await load();
            if (!success) return;
            toast.success("Patients refreshed.");
          }} size="icon" variant={"outline"}>
            <RefreshCcw />
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden pb-2">
        <DataTable searchKey="name" columns={columns} data={patients} />
      </div>
    </div>
  );
}