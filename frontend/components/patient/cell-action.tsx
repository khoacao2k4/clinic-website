"use client";

import { CircleX, MoreHorizontal, Pen } from "lucide-react";
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
import DeactivatePatientDialog from "./deactivate-patient-dialog";

interface CellActionProps {
  data: Patient;
  onUpdated?: () => Promise<boolean> | boolean; 
}

export const CellAction: React.FC<CellActionProps> = ({ data, onUpdated }) => {

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
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} >
              <Pen /> Edit
            </DropdownMenuItem>
          }
        />
        <DeactivatePatientDialog
          patient={data}
          onUpdated={onUpdated}
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} >
              <CircleX /> Deactivate
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
