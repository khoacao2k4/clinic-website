"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"

// A more comprehensive map of potential NextAuth.js errors
const errorMap = {
  // This is the most important error for your use case.
  // It's triggered when the `signIn` callback returns `false`.
  AccessDenied: {
    title: "Access Denied",
    description: "You do not have permission to access this application. Please contact the administrator if you believe this is an error.",
  },
  Configuration: {
    title: "Server Configuration Error",
    description: "There was a problem with the server configuration. Please contact support if this problem persists.",
  },
  // A default error for anything else
  Default: {
    title: "Something went wrong",
    description: "An unexpected error occurred. Please try signing in again.",
  }
};

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const errorKey = searchParams.get("error");

  // Determine which error message to show. Falls back to the default.
  const error = (errorKey && errorMap[errorKey as keyof typeof errorMap]) || errorMap.Default;

  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm text-center">
        <CardHeader>
          <div className="mx-auto bg-destructive/10 p-3 rounded-full">
             <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="mt-4 text-2xl">{error.title}</CardTitle>
          <CardDescription>
            {error.description}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/api/auth/signin">Go Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
