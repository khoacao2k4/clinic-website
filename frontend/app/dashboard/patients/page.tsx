import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/columns";
import { Patient } from "@/utils/patient-schema";

const patients: Patient[] = [
  { id: "1", name: "Nguyen Van A", email: "nguyenvana@email.com", gender: "Male", dateOfBirth: "1990-01-15" },
  { id: "2", name: "Tran Thi B", email: "tranthib@email.com", gender: "Female", dateOfBirth: "1988-03-22" },
  { id: "3", name: "Le Hoang C", email: "lehoangc@email.com", gender: "Male", dateOfBirth: "2001-07-30" },
  { id: "4", name: "Pham My D", email: "phammy.d@email.com", gender: "Female", dateOfBirth: "1995-11-05" },
  { id: "5", name: "Vo Minh E", email: "vominh.e@email.com", gender: "Male", dateOfBirth: "1978-09-05" },
  { id: "6", name: "Do Thi F", email: "dothi.f@email.com", gender: "Female", dateOfBirth: "1992-04-12" },
  { id: "7", name: "Hoang Van G", email: "hoangvang@email.com", gender: "Male", dateOfBirth: "2005-08-19" },
  { id: "8", name: "Ngo Thi H", email: "ngothi.h@email.com", gender: "Female", dateOfBirth: "1980-12-25" },
  { id: "9", name: "Dang Van I", email: "dangvani@email.com", gender: "Male", dateOfBirth: "1999-06-01" },
  { id: "10", name: "Bui Thi K", email: "buithik@email.com", gender: "Female", dateOfBirth: "1993-10-18" },
  { id: "11", name: "Ly Van L", email: "lyvanl@email.com", gender: "Male", dateOfBirth: "1982-03-09" },
  { id: "12", name: "Mai Thi M", email: "maithi.m@email.com", gender: "Female", dateOfBirth: "2000-05-27" },
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
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Patient
        </Button>
      </div>
      <div className="flex-1 overflow-hidden">
        <DataTable searchKey="name" columns={columns} data={patients} />
      </div>
    </div>
  );
}