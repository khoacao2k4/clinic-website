'use client';
import NewRecordDialog from "@/components/record/new-record-dialog";
import CalendarPicker from "@/components/record/calendar";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { toast } from "sonner";

export default function Toolbar({ patientId }: { patientId: string }) {
  const queryClient = useQueryClient();
  const handleRefetch = () => {
    queryClient.invalidateQueries({
      queryKey: ["records", patientId], 
      exact: false, // allow from/to variations
    });
    toast.success("Records refetched");
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <CalendarPicker />
      <div className="flex items-center gap-2">
        <NewRecordDialog patientId={patientId} />
        <Button
          onClick={handleRefetch}
          size="icon"
          variant="outline"
        >
          <RefreshCcw />
        </Button>
      </div>
    </div>
  );
}
