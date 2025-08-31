"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useState } from "react";
import { Patient } from "@/utils/db-schema";
import { PatientForm, PatientFormValues } from "@/components/patient/patient-form";
import { updatePatient } from "@/lib/api";

export function EditPatientModal({ patient, onUpdated, trigger }: { 
    patient: Patient;
    onUpdated?: () => Promise<boolean> | boolean;
    trigger?: React.ReactNode;
}) {
  const [apiError, setApiError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  async function handleSubmit(values: PatientFormValues) {
    setApiError(null);
    try {
        await updatePatient(patient.id, values);
        toast.success("Patient updated.");
        if (onUpdated) await onUpdated();
        setModalOpen(false);
    } catch (e) {
      setApiError("An unknown error occurred. Please try again.");
    }
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button variant="outline" size="sm">Edit</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Patient</DialogTitle>
          <DialogDescription>Update the patient's details below.</DialogDescription>
        </DialogHeader>
        {/* force remount on open so defaults refresh */}
        <PatientForm
          key={`${patient.id}-${open}`}
          initialValues={{
            name: patient.name,
            phoneNumber: patient.phoneNumber ?? "",
            gender: patient.gender,
            yearOfBirth: patient.yearOfBirth,
          }}
          onSubmit={handleSubmit}
          submitLabels={["Update Patient", "Updating..."]}
          apiError={apiError}
        />
      </DialogContent>
    </Dialog>
  );
}
