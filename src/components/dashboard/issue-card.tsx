"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"

export interface IssueProps {
  id: string
  title: string
  description: string
  status: "open" | "in-progress" | "pending-review" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  category: string
  assignee?: string
  createdAt: string
  updatedAt: string
  onClick?: () => void
}

export function IssueCard({
  id,
  title,
  description,
  status,
  priority,
  category,
  assignee,
  createdAt,
  updatedAt,
  onClick
}: IssueProps) {
  const statusVariant = {
    "open": "secondary",
    "in-progress": "default",
    "pending-review": "default",
    "resolved": "default",
    "closed": "default"
  } as const

  const priorityVariant = {
    "low": "default",
    "medium": "secondary",
    "high": "destructive",
    "urgent": "destructive"
  } as const

  const statusLabel = {
    "open": "Open",
    "in-progress": "In Progress",
    "pending-review": "Review Pending",
    "resolved": "Resolved",
    "closed": "Closed"
  }

  const priorityLabel = {
    "low": "Low",
    "medium": "Medium",
    "high": "High",
    "urgent": "Urgent"
  }

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg truncate">{title}</CardTitle>
          <Badge variant={statusVariant[status]}>
            {statusLabel[status]}
          </Badge>
        </div>
        <CardDescription>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm">ID: {id}</span>
            <Badge variant={priorityVariant[priority]} className="text-xs">
              {priorityLabel[priority]}
            </Badge>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {description}
        </p>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground block">Category:</span>
            <span>{category}</span>
          </div>
          <div>
            <span className="text-muted-foreground block">Assignee:</span>
            <span>{assignee || "Unassigned"}</span>
          </div>
          <div>
            <span className="text-muted-foreground block">Created:</span>
            <span>{formatDate(createdAt)}</span>
          </div>
          <div>
            <span className="text-muted-foreground block">Updated:</span>
            <span>{formatDate(updatedAt)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" onClick={onClick}>
          View Issue
        </Button>
      </CardFooter>
    </Card>
  )
}