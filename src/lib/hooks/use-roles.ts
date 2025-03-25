"use client"

import { createContext, useContext, useState } from "react"

type Role = "admin" | "teacher" | "staff" | "student" | "parent"

interface RolesContextType {
  roles: Role[]
  hasRole: (role: Role) => boolean
  addRole: (role: Role) => void
  removeRole: (role: Role) => void
}

const defaultContext: RolesContextType = {
  roles: [],
  hasRole: () => false,
  addRole: () => {},
  removeRole: () => {},
}

export const RolesContext = createContext<RolesContextType>(defaultContext)

export function RolesProvider({ children }: { children: React.ReactNode }) {
  const [roles, setRoles] = useState<Role[]>([])

  const hasRole = (role: Role) => roles.includes(role)

  const addRole = (role: Role) => {
    if (!hasRole(role)) {
      setRoles([...roles, role])
    }
  }

  const removeRole = (role: Role) => {
    setRoles(roles.filter((r) => r !== role))
  }

  return (
    <RolesContext.Provider
      value={{
        roles,
        hasRole,
        addRole,
        removeRole,
      }}
    >
      {children}
    </RolesContext.Provider>
  )
}

export function useRoles() {
  const context = useContext(RolesContext)
  if (context === undefined) {
    throw new Error("useRoles must be used within a RolesProvider")
  }
  return context
}