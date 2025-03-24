"use client"

import { withAuth } from "@/lib/components/auth/with-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function HRPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Human Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Manage staff, recruitment, and professional development.</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default withAuth(HRPage, { module: "hr", action: "view" })