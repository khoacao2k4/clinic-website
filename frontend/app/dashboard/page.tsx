import { redirect } from "next/navigation"
import Image from "next/image"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { SignOutButton } from "@/components/sign-out-button"
import { auth } from "@/lib/auth"

export default async function DashboardPage() {
  // Fetch the session on the server
  const session = await auth()

  // If no session exists, redirect to the sign-in page
  if (!session || !session.user) {
    redirect("/api/auth/signin")
  }

  const { user } = session

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Dashboard</CardTitle>
          <CardDescription>You are securely logged in.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          {user.image && (
            <Image
              src={user.image}
              alt={user.name || "User avatar"}
              width={80}
              height={80}
              className="rounded-full"
            />
          )}
          <div className="text-center">
            <p className="text-xl font-semibold">{user.name}</p>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </CardContent>
        <CardFooter>
          <SignOutButton />
        </CardFooter>
      </Card>
    </div>
  )
}
