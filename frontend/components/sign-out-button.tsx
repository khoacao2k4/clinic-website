import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/auth"
import { LogOut } from "lucide-react"

export function SignOutButton() {
  return (
    <Button 
      variant="outline" 
      className="w-full"
      // When clicked, call the signOut function and redirect to the homepage
      onClick={async () => {
        "use server"
        await signOut({ redirectTo: "/api/auth/signin" })
      }}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Sign Out
    </Button>
  )
}
