"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createPatient } from "@/lib/api";
import { PatientForm, PatientFormValues } from "@/components/patient/patient-form";

export function AddPatientModal({ onCreated }: { onCreated?: () => Promise<boolean> | boolean }) {
  const [apiError, setApiError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  async function handleSubmit(values: PatientFormValues) {
    setApiError(null);
    try {
      await createPatient(values);
      toast.success("Patient created successfully!");
      if (onCreated) await onCreated();
      setModalOpen(false);
    } catch (e) {
      setApiError("An unknown error occurred. Please try again.");
    }
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Patient
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
          <DialogDescription>
            Enter the patient's details below.
          </DialogDescription>
        </DialogHeader>
        <PatientForm
          initialValues={{ name: "", phoneNumber: "", gender: "Male", yearOfBirth: 1900 }}
          onSubmit={handleSubmit}
          submitLabels={["Create Patient", "Creating..."]}
          apiError={apiError}
        />
      </DialogContent>
    </Dialog>
  );
}
