import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/columns";
import { Patient } from "@/utils/patient-schema";
import { AddPatientModal } from "@/components/add-patient-modal";

const patients: Patient[] = [
];

export default async function PatientsPage() {
  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col gap-4 my-auto">
      {/* Page header (will take its natural height) */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Patients ({patients.length})
          </h1>
          <p className="text-muted-foreground">
            Manage your patient records here.
          </p>
        </div>
        <AddPatientModal />
      </div>
      <div className="flex-1 overflow-hidden pb-2">
        <DataTable searchKey="name" columns={columns} data={patients} />
      </div>
    </div>
  );
}