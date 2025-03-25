import { Metadata } from "next"
import { RolesProvider } from "@/lib/hooks/use-roles"
import { Toaster } from "@/components/ui/toaster"
import { SideNav } from "@/components/side-nav"

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
        <SideNav items={[
          {
            href: "/",
            title: "Dashboard",
          },
          {
            href: "/teaching",
            title: "Teaching",
          },
          {
            href: "/send",
            title: "SEND",
          },
          {
            href: "/finance",
            title: "Finance",
          },
          {
            href: "/estates",
            title: "Estates",
          },
          {
            href: "/hr",
            title: "HR",
          },
          {
            href: "/reports",
            title: "Reports",
          },
        ]} />
        <div className="flex-1 overflow-y-auto">
          <header className="sticky top-0 z-40 border-b bg-background">
            <div className="container flex h-16 items-center justify-between py-4">
              <h2 className="text-lg font-semibold">Schoolgle</h2>
            </div>
          </header>
          <main className="container mx-auto p-6">{children}</main>
        </div>
      </div>
      <Toaster />
    </RolesProvider>
  )
}