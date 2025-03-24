"use client"

import { withAuth } from "@/lib/components/auth/with-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function SENDPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Special Educational Needs & Disabilities</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Manage SEND provisions and student support.</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default withAuth(SENDPage, { module: "send", action: "view" })