"use client";

import { startTransition, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertTriangle, RotateCcw, Home, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Card className="border-destructive/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-destructive/10 text-destructive">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-semibold">We couldn't load this patient.</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                This can happen if the network blips or the data was temporarily unavailable.
              </p>

              {/* Collapsible raw error (optional) */}
              {error?.message && (
                <details className="mt-3 rounded-md border bg-muted/40 p-3 text-sm">
                  <summary className="cursor-pointer select-none text-muted-foreground">
                    Technical details
                  </summary>
                  <pre className="mt-2 whitespace-pre-wrap break-words">
                    {error.message}
                  </pre>
                </details>
              )}

              <div className="mt-6 flex flex-wrap gap-2">
                <Button
                  onClick={() => {
                    startTransition(() => {
                      router.refresh();
                      reset();
                    });
                  }}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retry
                </Button>

                <Button asChild variant="outline">
                  <Link href="/dashboard/patients">
                    <Users className="mr-2 h-4 w-4" />
                    Back to Patients
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
