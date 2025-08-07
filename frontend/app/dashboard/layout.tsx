import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // check session
  const session = await auth();
  if (!session || !session.user) {
    redirect("/api/auth/signin")
  }

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
