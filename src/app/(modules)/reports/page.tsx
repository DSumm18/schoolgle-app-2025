"use client"

import { withAuth } from "@/lib/components/auth/with-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function ReportsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Reports & Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Access and generate reports across all modules.</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default withAuth(ReportsPage, { module: "reports", action: "view" })