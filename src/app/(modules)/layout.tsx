"use client"

import { useAuth } from "@/lib/hooks/use-auth"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  BookOpen,
  Building2,
  FileText,
  GraduationCap,
  Heart,
  LayoutDashboard,
  PoundSterling,
  Users,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const modules = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    permission: { module: "dashboard", action: "view" },
  },
  {
    name: "Teaching",
    href: "/teaching",
    icon: BookOpen,
    permission: { module: "teaching", action: "view" },
  },
  {
    name: "SEND",
    href: "/send",
    icon: Heart,
    permission: { module: "send", action: "view" },
  },
  {
    name: "Finance",
    href: "/finance",
    icon: PoundSterling,
    permission: { module: "finance", action: "view" },
  },
  {
    name: "Estates",
    href: "/estates",
    icon: Building2,
    permission: { module: "estates", action: "view" },
  },
  {
    name: "HR",
    href: "/hr",
    icon: Users,
    permission: { module: "hr", action: "view" },
  },
  {
    name: "Reports",
    href: "/reports",
    icon: FileText,
    permission: { module: "reports", action: "view" },
  },
]

export default function ModuleLayout({ children }: { children: React.ReactNode }) {
  const { checkPermission, profile } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  if (!profile) {
    router.push("/auth/login")
    return null
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-background border-r">
        <div className="flex h-16 items-center border-b px-6">
          <GraduationCap className="h-6 w-6" />
          <span className="ml-2 font-semibold">Schoolgle</span>
        </div>
        <nav className="space-y-1 p-4">
          {modules.map((module) => {
            const isAllowed = checkPermission(module.permission.module, module.permission.action)
            if (!isAllowed) return null

            return (
              <Link
                key={module.href}
                href={module.href}
                className={cn(
                  "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium",
                  pathname === module.href
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-secondary/50"
                )}
              >
                <module.icon className="h-5 w-5" />
                <span>{module.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <header className="flex h-16 items-center justify-between border-b px-6">
          <h1 className="text-lg font-semibold">
            {modules.find((m) => pathname.startsWith(m.href))?.name || "Schoolgle"}
          </h1>
          <Button variant="ghost" onClick={() => router.push("/")}>
            Exit to Home
          </Button>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}