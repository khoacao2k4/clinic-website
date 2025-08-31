import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { Patient } from '@/utils/db-schema';
import { toast } from 'sonner';
import { updatePatient } from '@/lib/api';

const DeactivatePatientDialog = ({ trigger, onUpdated, patient }: {
    trigger?: React.ReactNode;
    onUpdated?: () => Promise<boolean> | boolean;
    patient: Patient;
}) => {

  async function handleInactive() {
    toast.promise(updatePatient(patient.id, { isActive: false }), {
        loading: 'Deactivating patient...',
        success: () => {
            if (onUpdated) onUpdated();
            return (
                <p>
                    Patient <span className="italic text-black">{patient.name}</span> has been deactivated.
                </p>
            )
        },
        error: "Deactivation failed. Please try again.",
    });
  }

  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            {trigger ?? <Button variant="outline" size="sm">Deactivate </Button>}
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Deactivate patient? 😿</AlertDialogTitle>
            <AlertDialogDescription>
                When deactivated,{' '}
                <span className="font-medium">{patient.name}</span>&apos;s profile won&apos;t be visible in the dashboard.
                Documents and past visits info will still be available in the database.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
                onClick={handleInactive}
            >
                Deactivate
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeactivatePatientDialog;
