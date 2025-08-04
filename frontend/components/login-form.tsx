'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { providerMap } from "@/lib/auth";
import { signIn } from "next-auth/react"
import { JSX, useState } from "react";
import { Loader2Icon } from "lucide-react";

const SIGNIN_ERROR_URL = "/error"

const iconMap: Record<string, JSX.Element> = {
  "Google": <FaGoogle />,
  "GitHub": <FaGithub />,
}


// Updated props as the form doesn't need standard form attributes anymore
export function LoginForm({
  className
}: React.HTMLAttributes<"div">) {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null)

  const handleSignIn = async (providerId: string, providerName: string) => {
    setLoadingProvider(providerName);
    await signIn(providerId, { callbackUrl: "/dashboard" })
  }

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
            onClick={() => handleSignIn(provider.id, provider.name)}
            disabled={loadingProvider === provider.name}  
          >
            {loadingProvider === provider.name ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              <>
                {iconMap[provider.name]}
                Login with {provider.name}
              </>
            )}
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
