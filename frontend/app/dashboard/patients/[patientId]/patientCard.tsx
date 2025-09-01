"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, CalendarDays, Clock, User2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchPatientDetails } from "@/lib/api";
import { Patient } from "@/utils/db-schema";
import { getDateFromString } from "@/lib/utils";

const PatientSkeleton = () => (
  <div className="space-y-4">
    <Button asChild variant="ghost" size="sm" className="-ml-2">
      <Link href="/dashboard/patients">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Link>
    </Button>

    <Card>
      <CardHeader className="flex flex-col items-center text-center">
        <Skeleton className="h-16 w-16 rounded-full" />
        <CardTitle className="mt-3">
          <Skeleton className="h-6 w-40" />
        </CardTitle>
        <div className="mt-1 space-y-1 text-sm text-muted-foreground">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-28" />
        </div>
      </CardHeader>
    </Card>
  </div>
);

export default function PatientCard({ patientId }: { patientId: string }) {
  const patientQ = useQuery({
    queryKey: ["patient", patientId],
    queryFn: () => fetchPatientDetails(patientId),
    retry: 1,
    staleTime: 60 * 1000, // 1 minute
  });

  if (patientQ.isLoading) {
    return (
      <PatientSkeleton />
    )
  }
  if (patientQ.isError) {
    throw patientQ.error;
  }
  if (!patientQ.data) {
    throw new Error("Patient not found.");
  }

  const patient = patientQ.data as Patient & {
    recordCount?: number;
    latestVisitDate?: string;
  };
  const lastVisit = patient.latestVisitDate ? getDateFromString(patient.latestVisitDate) : "—";

  return (
    <div className="space-y-4">
      <Button asChild variant="outline">
        <Link href="/dashboard/patients">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </Button>

      <Card>
        <CardHeader className="flex flex-col items-center text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-muted/50 ring-1 ring-border">
            <User2 className="h-8 w-8" />
          </div>
          <CardTitle className="mt-3">{patient.name}</CardTitle>
          <div className="mt-1 text-sm text-muted-foreground">
            Phone: {patient.phoneNumber ?? "—"} <br />
            Gender: {patient.gender ?? "—"} <br />
            Year of Birth: {patient.yearOfBirth ?? "—"}
          </div>
        </CardHeader>
        <CardContent className="mt-4 space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            Total visits: {patient.recordCount ?? 0}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            Last visit: {lastVisit}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
