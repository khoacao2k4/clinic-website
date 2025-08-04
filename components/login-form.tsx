import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { providerMap, signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

const SIGNIN_ERROR_URL = "/error"

// Updated props as the form doesn't need standard form attributes anymore
export function LoginForm({
  className
}: React.HTMLAttributes<"div">) {
  return (
    // Changed from <form> to <div> as it no longer submits form data directly
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Choose a provider below to login to your account
        </p>
      </div>
      <div className="grid gap-3">
        {providerMap.map((provider) => (
          <Button 
            key={provider.id} 
            variant="outline" 
            className="w-full" 
            onClick={async () => {
              "use server"
              try {
                await signIn(provider.id);
              } catch (error) {
                // Signin can fail for a number of reasons, such as the user
                // not existing, or the user not having the correct role.
                // In some cases, you may want to redirect to a custom error
                if (error instanceof AuthError) {
                  return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
                }
  
                // Otherwise if a redirects happens Next.js can handle it
                // so you can just re-thrown the error and let Next.js handle it.
                // Docs:
                // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                throw error
              }
            }}
          >
            <FaGithub className="mr-2" />
            Login with {provider.name}
          </Button>
        ))}
      </div>
      <div className="text-center text-sm">
        Need an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Request access
        </a>
      </div>
    </div>
  )
}
