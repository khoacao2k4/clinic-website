"use client";

import { MoreHorizontal, Pen, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Patient } from "@/utils/patient-schema";
import { EditPatientModal } from "./edit-patient-modal";

interface CellActionProps {
  data: Patient;
  onUpdated?: () => Promise<boolean> | boolean; 
}

export const CellAction: React.FC<CellActionProps> = ({ data, onUpdated }) => {
  const onDelete = () => {
    // This would typically show a confirmation dialog
    console.log("Deleting patient:", data.name);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <EditPatientModal
          patient={data}
          onUpdated={onUpdated}
          trigger={
            <DropdownMenuItem
              // shadcn tip: prevent default so the DialogTrigger can handle it
              onSelect={(e) => e.preventDefault()}
            >
              <Pen className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
          }
        />
        <DropdownMenuItem onClick={onDelete}>
          <Trash className="mr-2 h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
