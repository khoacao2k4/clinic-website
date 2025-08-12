import React, { useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { Patient } from '@/utils/patient-schema';
import { toast } from 'sonner';

const DeletePatientDialog = ({ trigger, patient }: {
    trigger?: React.ReactNode;
    patient: Patient;
}) => {

  async function handleDelete(patientID: string) {
    toast.loading("Deleting patient...");
    await new Promise(r => setTimeout(r, 2000));
    toast.success("Patient " + patientID + " has been deleted.");
  }
  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            {trigger ?? <Button variant="outline" size="sm">Delete</Button>}
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Delete patient?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. It will permanently remove{" "}
                <span className="font-medium">{patient.name}</span> from your records.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
                onClick={() =>handleDelete(patient.id)}
            >
                Delete
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeletePatientDialog;
