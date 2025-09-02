"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import type { Session } from "next-auth";
import { ProgressProvider } from '@bprogress/next/app';

export function ClientProviders({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <SidebarProvider>
          <ProgressProvider 
            height="4px"
            color="var(--primary)"
            options={{ showSpinner: false }}
            shallowRouting
          >
            <Toaster position="top-center" richColors closeButton />
            {children}
          </ProgressProvider>
        </SidebarProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
