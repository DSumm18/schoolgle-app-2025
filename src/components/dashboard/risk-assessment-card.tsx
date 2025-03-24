"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"

export interface RiskAssessmentProps {
  id: string
  title: string
  activityName: string
  date: string
  status: "draft" | "submitted" | "approved" | "rejected" | "requires-revision"
  riskLevel: "low" | "medium" | "high" | "critical"
  assessor: string
  lastUpdated: string
  onClick?: () => void
}

export function RiskAssessmentCard({
  id,
  title,
  activityName,
  date,
  status,
  riskLevel,
  assessor,
  lastUpdated,
  onClick
}: RiskAssessmentProps) {
  const statusVariant = {
    "draft": "default",
    "submitted": "default",
    "approved": "default",
    "rejected": "destructive",
    "requires-revision": "secondary"
  } as const

  const riskVariant = {
    "low": "default",
    "medium": "secondary",
    "high": "destructive",
    "critical": "destructive"
  } as const

  const statusLabel = {
    "draft": "Draft",
    "submitted": "Submitted",
    "approved": "Approved",
    "rejected": "Rejected",
    "requires-revision": "Needs Revision"
  }

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant={statusVariant[status]}>
            {statusLabel[status]}
          </Badge>
        </div>
        <CardDescription>
          <div className="flex flex-col space-y-1 mt-2">
            <div className="text-sm">Activity: {activityName}</div>
            <div className="text-sm">Date: {formatDate(date)}</div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <Badge variant={riskVariant[riskLevel]} className="text-xs">
            Risk Level: {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
          </Badge>
          <span className="text-xs text-muted-foreground">
            ID: {id}
          </span>
        </div>
        
        <div className="text-sm">
          <div className="flex justify-between mb-1">
            <span className="text-muted-foreground">Assessor:</span>
            <span>{assessor}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Last Updated:</span>
            <span>{formatDate(lastUpdated)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" onClick={onClick}>
          View Assessment
        </Button>
      </CardFooter>
    </Card>
  )
}