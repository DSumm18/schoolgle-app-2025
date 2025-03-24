"use client"

import { createContext, useContext, useState } from "react"

export interface ModulePermissions {
  view: boolean
  create: boolean
  edit: boolean
  delete: boolean
  approve?: boolean
  export?: boolean
  manage?: boolean
}

export interface Permissions {
  dashboard: ModulePermissions
  issues: ModulePermissions
  send: ModulePermissions
  finance: ModulePermissions
  estates: ModulePermissions
  hr: ModulePermissions
  teaching: ModulePermissions
  users: ModulePermissions
  schools: ModulePermissions
  reports: ModulePermissions
  settings: ModulePermissions
}

export interface Role {
  id: string
  name: string
  description: string
  userCount: number
  isSystem: boolean
  permissions: Permissions
}

interface RolesContextType {
  roles: Role[]
  getRole: (roleId: string) => Role | undefined
  hasPermission: (roleId: string, module: keyof Permissions, action: keyof ModulePermissions) => boolean
}

const RolesContext = createContext<RolesContextType | undefined>(undefined)

const initialRoles: Role[] = [
  {
    id: "admin",
    name: "Administrator",
    description: "Full system access with all permissions",
    userCount: 5,
    isSystem: true,
    permissions: {
      dashboard: {
        view: true,
        create: true,
        edit: true,
        delete: true,
        manage: true,
      },
      issues: {
        view: true,
        create: true,
        edit: true,
        delete: true,
        approve: true,
      },
      send: {
        view: true,
        create: true,
        edit: true,
        delete: true,
        approve: true,
        manage: true,
      },
      finance: {
        view: true,
        create: true,
        edit: true,
        delete: true,
        approve: true,
        manage: true,
      },
      estates: {
        view: true,
        create: true,
        edit: true,
        delete: true,
        approve: true,
        manage: true,
      },
      hr: {
        view: true,
        create: true,
        edit: true,
        delete: true,
        approve: true,
        manage: true,
      },
      teaching: {
        view: true,
        create: true,
        edit: true,
        delete: true,
        approve: true,
        manage: true,
      },
      users: {
        view: true,
        create: true,
        edit: true,
        delete: true,
        manage: true,
      },
      schools: {
        view: true,
        create: true,
        edit: true,
        delete: true,
        manage: true,
      },
      reports: {
        view: true,
        create: true,
        edit: true,
        delete: true,
        export: true,
        manage: true,
      },
      settings: {
        view: true,
        create: true,
        edit: true,
        delete: true,
        manage: true,
      },
    },
  },
  {
    id: "teacher",
    name: "Teacher",
    description: "Standard teaching staff access",
    userCount: 120,
    isSystem: true,
    permissions: {
      dashboard: {
        view: true,
        create: false,
        edit: false,
        delete: false,
        manage: false,
      },
      issues: {
        view: true,
        create: true,
        edit: false,
        delete: false,
        approve: false,
      },
      send: {
        view: true,
        create: true,
        edit: true,
        delete: false,
        approve: false,
        manage: false,
      },
      finance: {
        view: false,
        create: false,
        edit: false,
        delete: false,
        approve: false,
        manage: false,
      },
      estates: {
        view: true,
        create: true,
        edit: false,
        delete: false,
        approve: false,
        manage: false,
      },
      hr: {
        view: false,
        create: false,
        edit: false,
        delete: false,
        approve: false,
        manage: false,
      },
      teaching: {
        view: true,
        create: true,
        edit: true,
        delete: false,
        approve: false,
        manage: false,
      },
      users: {
        view: false,
        create: false,
        edit: false,
        delete: false,
        manage: false,
      },
      schools: {
        view: true,
        create: false,
        edit: false,
        delete: false,
        manage: false,
      },
      reports: {
        view: true,
        create: false,
        edit: false,
        delete: false,
        export: false,
        manage: false,
      },
      settings: {
        view: false,
        create: false,
        edit: false,
        delete: false,
        manage: false,
      },
    },
  },
]

export function RolesProvider({ children }: { children: React.ReactNode }) {
  const [roles] = useState<Role[]>(initialRoles)

  const getRole = (roleId: string) => {
    return roles.find((role) => role.id === roleId)
  }

  const hasPermission = (
    roleId: string,
    module: keyof Permissions,
    action: keyof ModulePermissions
  ) => {
    const role = getRole(roleId)
    if (!role) return false
    return role.permissions[module]?.[action] ?? false
  }

  return (
    <RolesContext.Provider value={{ roles, getRole, hasPermission }}>
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