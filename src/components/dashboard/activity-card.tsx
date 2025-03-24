import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"

export interface ActivityProps {
  id: string
  title: string
  date: string
  status: "pending" | "approved" | "completed" | "cancelled"
  location: string
  description: string
  riskLevel?: "low" | "medium" | "high"
  participants?: number
  onClick?: () => void
}

export function ActivityCard({
  id,
  title,
  date,
  status,
  location,
  description,
  riskLevel = "low",
  participants = 0,
  onClick
}: ActivityProps) {
  const statusVariant = {
    pending: "secondary",
    approved: "default",
    completed: "default",
    cancelled: "destructive"
  } as const

  const riskVariant = {
    low: "default",
    medium: "secondary",
    high: "destructive"
  } as const

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant={statusVariant[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        <CardDescription>
          <div className="flex flex-col space-y-1 mt-2">
            <div className="text-sm">Date: {formatDate(date)}</div>
            <div className="text-sm">Location: {location}</div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{description}</p>
        <div className="flex items-center gap-2 mt-4">
          <Badge variant={riskVariant[riskLevel]} className="text-xs">
            Risk: {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
          </Badge>
          {participants > 0 && (
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {participants} Participants
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" onClick={onClick}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}