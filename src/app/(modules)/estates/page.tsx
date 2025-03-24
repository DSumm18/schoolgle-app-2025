"use client"

import { withAuth } from "@/lib/components/auth/with-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function EstatesPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Estates Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Manage facilities, maintenance, and health & safety.</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default withAuth(EstatesPage, { module: "estates", action: "view" })