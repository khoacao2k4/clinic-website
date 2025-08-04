import ClinicFooter from "@/components/footer"
import ClinicNavbar from "@/components/navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <ClinicNavbar />
        {children}
        <ClinicFooter />
    </>
  )
}