"use client"

import { withAuth } from "@/lib/components/auth/with-auth"
import { useAuth } from "@/lib/hooks/use-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Building2,
  FileText,
  Heart,
  PoundSterling,
  Users,
} from "lucide-react"
import Link from "next/link"

const modules = [
  {
    name: "Teaching",
    description: "Manage curriculum, lessons, and student progress",
    href: "/teaching",
    icon: BookOpen,
    permission: { module: "teaching", action: "view" },
  },
  {
    name: "SEND",
    description: "Special Educational Needs & Disabilities support",
    href: "/send",
    icon: Heart,
    permission: { module: "send", action: "view" },
  },
  {
    name: "Finance",
    description: "Budgets, expenses, and financial reports",
    href: "/finance",
    icon: PoundSterling,
    permission: { module: "finance", action: "view" },
  },
  {
    name: "Estates",
    description: "Facilities, maintenance, and health & safety",
    href: "/estates",
    icon: Building2,
    permission: { module: "estates", action: "view" },
  },
  {
    name: "HR",
    description: "Staff management and professional development",
    href: "/hr",
    icon: Users,
    permission: { module: "hr", action: "view" },
  },
  {
    name: "Reports",
    description: "Analytics and reporting across all modules",
    href: "/reports",
    icon: FileText,
    permission: { module: "reports", action: "view" },
  },
]

function DashboardPage() {
  const { checkPermission, profile } = useAuth()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {profile?.name}</h1>
          <p className="text-muted-foreground">
            Access your modules and manage your school&apos;s operations
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => {
          const isAllowed = checkPermission(module.permission.module, module.permission.action)
          if (!isAllowed) return null

          return (
            <Card key={module.href}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <module.icon className="h-5 w-5" />
                  {module.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">{module.description}</p>
                <Button asChild>
                  <Link href={module.href}>Access Module</Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default withAuth(DashboardPage, { module: "dashboard", action: "view" })