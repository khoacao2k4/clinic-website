import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import type { Provider } from "next-auth/providers"
 
const providers: Provider[] = [ Github ]

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  pages: {
    signIn: "/login",
    error: "/error",
  }
})