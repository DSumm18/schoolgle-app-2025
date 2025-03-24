"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/hooks/use-auth"
import type { ComponentType } from "react"

interface WithAuthProps {
  module: string
  action: string
}

export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  { module, action }: WithAuthProps
) {
  return function WithAuthComponent(props: P) {
    const router = useRouter()
    const { checkPermission, profile, isLoading } = useAuth()

    if (isLoading) {
      return (
        <div className="flex h-[50vh] items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      )
    }

    if (!profile) {
      router.push("/auth/login")
      return null
    }

    const hasPermission = checkPermission(module, action)

    if (!hasPermission) {
      return (
        <div className="flex h-[50vh] flex-col items-center justify-center space-y-4">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">
            You do not have permission to access this page.
          </p>
        </div>
      )
    }

    return <WrappedComponent {...props} />
  }
}