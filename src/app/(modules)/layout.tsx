import { Metadata } from "next"
import { RolesProvider } from "@/lib/hooks/use-roles"
import { Toaster } from "@/components/ui/toaster"
import { header as Header } from "@/components/header"
import { SideNav as Sidebar } from "@/components/side-nav"

export const metadata: Metadata = {
  title: "Schoolgle - Dashboard",
  description: "School management system",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <RolesProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          <Header />
          <main className="container mx-auto p-6">{children}</main>
        </div>
      </div>
      <Toaster />
    </RolesProvider>
  )
}
