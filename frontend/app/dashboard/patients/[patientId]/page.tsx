import PatientCard from "./patientCard";
import Toolbar from "./toolbar";
import RecordsPanel from "./recordPanel";

export default async function Page({
  params,
  searchParams,
}: {
  params: { patientId: string };
  searchParams: { from?: string; to?: string };
}) {
  return (
    <div className="px-4 py-6">
      <div className="grid gap-6 min-[1110px]:grid-cols-[300px_1fr]">
        <PatientCard
          patientId={params.patientId}
        />
        <div className="flex flex-col gap-4 h-dvh">
          <Toolbar patientId={params.patientId} />
          <RecordsPanel patientId={params.patientId} />
        </div>
      </div>
    </div>
  );
}
