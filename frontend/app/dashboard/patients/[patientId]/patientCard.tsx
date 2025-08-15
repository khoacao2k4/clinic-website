import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Patient } from "@/utils/patient-schema";
import { ArrowLeft, CalendarDays, Clock, User2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const patientCard = ({
  patient,
  totalVisits,
  lastVisit,
}: {
  patient: Patient;
  totalVisits: number;
  lastVisit: string;
}) => {
  return (
    <div className="space-y-4">
      <Button asChild variant="ghost" size="sm" className="-ml-2">
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
            Phone: {patient?.phoneNumber ?? "—"} <br />
            Gender: {patient?.gender ?? "—"} <br />
            Year of Birth: {patient?.yearOfBirth ?? "—"}
          </div>
        </CardHeader>
        <CardContent className="mt-4 space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            Total visits: {totalVisits}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            Last visit: {lastVisit}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default patientCard;
