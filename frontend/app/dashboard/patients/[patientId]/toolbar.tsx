import NewRecordDialog from "@/components/record/new-record-dialog";
import CalendarPicker from "@/components/record/calendar";

export default function Toolbar({ patientId }: { patientId: string }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <CalendarPicker />
      <NewRecordDialog patientId={patientId} />
    </div>
  );
}
