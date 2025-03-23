import { Button } from "@/components/ui/button"
import { IssueCard } from "@/components/dashboard/issue-card"

const issues = [
  {
    id: "ISS-2025-001",
    title: "Projector not working in Room 103",
    description: "The projector in Room 103 is not responding to the remote or manual controls. Unable to use for presentations.",
    status: "open",
    priority: "high",
    category: "Equipment",
    assignee: "David Thompson",
    createdAt: "2025-03-10T09:23:15Z",
    updatedAt: "2025-03-10T09:23:15Z"
  },
  {
    id: "ISS-2025-002",
    title: "WiFi connection unstable in Library",
    description: "Students and staff are experiencing frequent WiFi disconnections in the library area. Issue started after recent router upgrade.",
    status: "in-progress",
    priority: "medium",
    category: "IT Infrastructure",
    assignee: "Sarah Johnson",
    createdAt: "2025-03-08T11:45:30Z",
    updatedAt: "2025-03-09T14:20:10Z"
  },
  {
    id: "ISS-2025-003",
    title: "Water leak in Science Lab",
    description: "There is a slow water leak from the ceiling in the Science Lab. Small puddle forming near the storage cabinets.",
    status: "pending-review",
    priority: "urgent",
    category: "Facilities",
    assignee: "Michael Roberts",
    createdAt: "2025-03-12T08:30:00Z",
    updatedAt: "2025-03-12T15:45:22Z"
  },
  {
    id: "ISS-2025-004",
    title: "Missing textbooks in English Department",
    description: "Inventory check shows 15 copies of 'To Kill a Mockingbird' missing from the English Department storage.",
    status: "open",
    priority: "low",
    category: "Inventory",
    assignee: undefined,
    createdAt: "2025-03-14T10:12:45Z",
    updatedAt: "2025-03-14T10:12:45Z"
  },
  {
    id: "ISS-2025-005",
    title: "Heating system malfunction in Gymnasium",
    description: "The heating system in the gymnasium is not working properly. Temperature is too low for physical education classes.",
    status: "resolved",
    priority: "high",
    category: "Facilities",
    assignee: "James Wilson",
    createdAt: "2025-02-28T13:20:10Z",
    updatedAt: "2025-03-05T09:15:30Z"
  },
  {
    id: "ISS-2025-006",
    title: "School website displaying incorrect calendar events",
    description: "The school website is showing outdated calendar events. New events added to the system are not appearing on the public website.",
    status: "closed",
    priority: "medium",
    category: "IT Systems",
    assignee: "Emily Chen",
    createdAt: "2025-02-15T14:30:00Z",
    updatedAt: "2025-02-20T11:45:20Z"
  }
] as const

export default function IssueTrackerPage() {
  return (
    <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Issue Tracker</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Track and manage issues across your educational institution.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button size="lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Report Issue
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium mb-4">Quick Filters</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">All Issues</Button>
          <Button variant="outline" size="sm">Open Issues</Button>
          <Button variant="outline" size="sm">High Priority</Button>
          <Button variant="outline" size="sm">My Assigned Issues</Button>
          <Button variant="outline" size="sm">Recently Updated</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {issues.map((issue) => (
          <IssueCard
            key={issue.id}
            {...issue}
            onClick={() => console.log(`View issue ${issue.id}`)}
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline">
          Load More Issues
        </Button>
      </div>
    </div>
  )
}