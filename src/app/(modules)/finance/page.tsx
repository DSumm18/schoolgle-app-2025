"use client"

import { withAuth } from "@/lib/components/auth/with-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function FinancePage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Finance Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Manage budgets, expenses, and financial reports.</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default withAuth(FinancePage, { module: "finance", action: "view" })