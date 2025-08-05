import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar";
import { SessionProvider } from "next-auth/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // The SessionProvider is needed for the AppSidebar
    <SessionProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-muted/40">
          <AppSidebar />
          <div className="flex flex-col w-full">
            <Header />
            <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
}
