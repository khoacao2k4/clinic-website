import * as React from "react"
import {
  FileText,
  Users,
} from "lucide-react"
import { FaEye } from "react-icons/fa"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { CompanyHeader } from "@/components/company-header"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SessionProvider } from "next-auth/react"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  companyInfo: {
    name: "Dr. Khánh Trang's Clinic",
    logo: FaEye,
  },
  navMain: [
    {
      title: "Patients",
      url: "/dashboard/patients",
      icon: Users,
    },
    {
      title: "Prescriptions",
      url: "/dashboard/prescriptions",
      icon: FileText,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CompanyHeader companyInfo={data.companyInfo} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SessionProvider>
          <NavUser/>
        </SessionProvider>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
