import { VisitRecord } from "@/utils/db-schema";
import router from "next/router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { redirect, RedirectType } from "next/navigation";
import { deleteRecord } from "@/lib/api";
import { toast } from "sonner";

const RecordCard = ({
  record,
  patientId,
  onDeleted,
}: {
  record: VisitRecord;
  patientId: string;
  onDeleted: () => void;
}) => {
  const dateStr = new Date(record.visitDate).toLocaleDateString("en-GB", {
    timeZone: "UTC",
  });
  return (
    <div
      key={record.id}
      className="
            group relative flex h-[98px] items-start gap-3 rounded-xl border
            bg-gradient-to-b from-background to-muted/20 px-4 py-3 text-left
            shadow-sm ring-1 ring-transparent transition
            hover:-translate-y-[1px] hover:shadow-md hover:ring-1 hover:ring-primary/20
            hover:cursor-pointer
        "
      onDoubleClick={() =>
        redirect(`/dashboard/patients/${patientId}/records/${record.id}`, RedirectType.push)
      }
    >
      {/* Leading dot / accent */}
      <span
        aria-hidden
        className=" mt-[2px] inline-block h-2 w-2 flex-none rounded-full
                      bg-primary/80 group-hover:bg-primary"
      />
      <div className="min-w-0 flex-1">
        <div className="truncate text-[15px] font-medium tracking-tight"> {dateStr} </div>
        <div className="mt-1 text-xs text-muted-foreground">Visit record</div>
      </div>

      {/* actions (kebab) */}
      <div className="absolute right-1 top-1 opacity-0 transition group-hover:opacity-100">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              aria-label={`Actions for ${dateStr}`}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() =>
                redirect(`/dashboard/patients/${patientId}/records/${record.id}`, RedirectType.push)
              }
            >
              Open
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={async () => {
                try {
                  await deleteRecord(record.id);
                  toast.success("Record deleted");
                  onDeleted();
                } catch (e: any) {
                  toast.error(e?.message || "Failed to delete");
                }
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default RecordCard;
