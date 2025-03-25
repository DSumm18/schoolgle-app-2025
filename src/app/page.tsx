"use client"

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
  },
  {
    name: "SEND",
    description: "Special Educational Needs & Disabilities support",
    href: "/send",
    icon: Heart,
  },
  {
    name: "Finance",
    description: "Budgets, expenses, and financial reports",
    href: "/finance",
    icon: PoundSterling,
  },
  {
    name: "Estates",
    description: "Facilities, maintenance, and health & safety",
    href: "/estates",
    icon: Building2,
  },
  {
    name: "HR",
    description: "Staff management and professional development",
    href: "/hr",
    icon: Users,
  },
  {
    name: "Reports",
    description: "Analytics and reporting across all modules",
    href: "/reports",
    icon: FileText,
  },
]

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome to Schoolgle</h1>
          <p className="text-muted-foreground">
            Access your modules and manage your school&apos;s operations
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
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
        ))}
      </div>
    </div>
  )
}