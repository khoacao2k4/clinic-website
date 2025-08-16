// app/(dashboard)/layout.tsx (Server Component)
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ClientProviders } from "./clientProviders";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return (
    <ClientProviders session={session}>
      <div className="flex min-h-screen w-full bg-muted/40">
        <AppSidebar />
        <div className="flex flex-col w-full">
          <Header />
          <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </div>
      </div>
    </ClientProviders>
  );
}
