import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function DashboardPage() {
  return (
    <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Welcome back! Here's an overview of what's happening.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-2">
          <Link href="/modules/activity-management">
            <Button variant="outline">
              Activities
            </Button>
          </Link>
          <Link href="/modules/risk-assessment">
            <Button variant="outline">
              Risk Assessments
            </Button>
          </Link>
          <Link href="/modules/issue-tracker">
            <Button variant="outline">
              Issues
            </Button>
          </Link>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="space-y-4 mb-8">
        <Alert variant="warning">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <AlertTitle>Attention Required</AlertTitle>
          <AlertDescription>
            3 risk assessments require your approval before activities can proceed.
          </AlertDescription>
        </Alert>

        <Alert variant="info">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <AlertTitle>Upcoming Event</AlertTitle>
          <AlertDescription>
            Science Fair 2025 is scheduled for May 15, 2025. All preparations should be completed by May 1.
          </AlertDescription>
        </Alert>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Activities</CardTitle>
            <CardDescription>All scheduled activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <div className="text-xs text-green-600 flex items-center mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span>Up 8% from last month</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Link href="/modules/activity-management" className="text-sm text-blue-600 hover:underline">
              View all activities
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Risk Assessments</CardTitle>
            <CardDescription>Total risk assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">18</div>
            <div className="text-xs text-yellow-600 flex items-center mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>3 need attention</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Link href="/modules/risk-assessment" className="text-sm text-blue-600 hover:underline">
              View all assessments
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Open Issues</CardTitle>
            <CardDescription>Issues requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">7</div>
            <div className="text-xs text-red-600 flex items-center mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span>2 high priority</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Link href="/modules/issue-tracker" className="text-sm text-blue-600 hover:underline">
              View all issues
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Users</CardTitle>
            <CardDescription>Active system users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42</div>
            <div className="text-xs text-green-600 flex items-center mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span>5 new this month</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Link href="#" className="text-sm text-blue-600 hover:underline">
              Manage users
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* Recent Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest activities added to the system</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[
                { title: "Science Fair 2025", date: "May 15, 2025", status: "Approved" },
                { title: "Field Trip: Natural History Museum", date: "April 20, 2025", status: "Pending" },
                { title: "Sports Day", date: "June 5, 2025", status: "Approved" },
                { title: "End of Year Concert", date: "June 28, 2025", status: "Pending" }
              ].map((activity, index) => (
                <li key={index} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{activity.date}</p>
                  </div>
                  <span className={`text-sm ${activity.status === 'Approved' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {activity.status}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Activities
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Issues</CardTitle>
            <CardDescription>Latest issues reported in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[
                { title: "Projector not working in Room 103", date: "March 10, 2025", priority: "High" },
                { title: "WiFi connection unstable in Library", date: "March 8, 2025", priority: "Medium" },
                { title: "Water leak in Science Lab", date: "March 12, 2025", priority: "Urgent" },
                { title: "Missing textbooks in English Department", date: "March 14, 2025", priority: "Low" }
              ].map((issue, index) => (
                <li key={index} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{issue.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{issue.date}</p>
                  </div>
                  <span className={`text-sm ${issue.priority === 'Low' ? 'text-green-600' : issue.priority === 'Medium' ? 'text-yellow-600' : 'text-red-600'}`}>
                    {issue.priority}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Issues
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}