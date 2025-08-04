import { FaEye } from "react-icons/fa";
import { LoginForm } from "@/components/login-form"
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function LoginPage() {
  // Fetch the session on the server
  const session = await auth()
  
  // If session exists, redirect to the dashboard
  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="absolute top-3 right-3 z-50">
        <ModeToggle />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <FaEye className="size-4"/>
            </div>
            Dr. Huỳnh Khánh Trang
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="https://picsum.photos/2500/2500"
          fill
          alt="Random background image"
          className="absolute inset-0 h-full w-full object-cover dark:grayscale"
        />
      </div>
    </div>
  )
}
