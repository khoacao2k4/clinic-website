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

interface CellActionProps {
  data: Patient;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  // These functions will later be connected to your backend API
  const onEdit = () => {
    // This would typically open a modal or navigate to an edit page
    console.log("Editing patient:", data.name);
  };

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
        <DropdownMenuItem onClick={onEdit}>
          <Pen className="mr-2 h-4 w-4" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete}>
          <Trash className="mr-2 h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
