"use client"

import { createBrowserClient } from "@supabase/ssr"
import { useRoles } from "@/lib/context/roles-context"
import { useEffect, useState } from "react"

interface UserProfile {
  id: string
  email: string
  name: string
  role_id: string
  avatar_url?: string
  school_id?: string
}

export function useAuth() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { hasPermission } = useRoles()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getUser() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          const { data: profile } = await supabase
            .from("user_profiles")
            .select("*")
            .eq("id", user.id)
            .single()

          setProfile(profile)
        }
      } catch (error) {
        console.error("Error loading user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getUser()
  }, [supabase])

  const checkPermission = (module: string, action: string) => {
    if (!profile?.role_id) return false
    return hasPermission(profile.role_id, module as any, action as any)
  }

  return {
    profile,
    isLoading,
    checkPermission,
  }
}