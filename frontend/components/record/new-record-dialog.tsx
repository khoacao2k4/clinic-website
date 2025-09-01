"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { createRecord } from "@/lib/api";

export default function NewRecordDialog({ patientId }: { patientId: string }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function handleCreate() {
    if (!date) return;
    setPending(true);
    try {
      const iso = date.toISOString().slice(0, 10);
      const rec = await createRecord({ patientId, visitDate: iso });
      toast.success("Record created");
      setOpen(false);
      // router.push(`/dashboard/patients/${patientId}/records/${rec.id}`);
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button>New Record</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Select visit date</DialogTitle></DialogHeader>
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow-sm"
            captionLayout="dropdown"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleCreate} disabled={pending}>{pending ? "Creating…" : "Create"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
