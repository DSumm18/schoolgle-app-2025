"use client"

import { withAuth } from "@/lib/components/auth/with-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function TeachingPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Teaching & Learning</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Manage curriculum, lessons, and student progress.</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default withAuth(TeachingPage, { module: "teaching", action: "view" })