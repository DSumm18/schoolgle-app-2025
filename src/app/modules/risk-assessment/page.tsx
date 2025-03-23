import { Button } from "@/components/ui/button"
import { RiskAssessmentCard } from "@/components/dashboard/risk-assessment-card"

const riskAssessments = [
  {
    id: "RA-2025-001",
    title: "Science Fair Risk Assessment",
    activityName: "Science Fair 2025",
    date: "2025-05-15T14:00:00Z",
    status: "approved",
    riskLevel: "low",
    assessor: "Dr. Emily Chen",
    lastUpdated: "2025-02-18T09:25:00Z"
  },
  {
    id: "RA-2025-002",
    title: "Museum Field Trip Assessment",
    activityName: "Field Trip: Natural History Museum",
    date: "2025-04-20T09:00:00Z",
    status: "submitted",
    riskLevel: "medium",
    assessor: "John Williams",
    lastUpdated: "2025-03-05T14:30:00Z"
  },
  {
    id: "RA-2025-003",
    title: "Sports Day Safety Plan",
    activityName: "Sports Day",
    date: "2025-06-05T09:30:00Z",
    status: "approved",
    riskLevel: "medium",
    assessor: "Sarah Johnson",
    lastUpdated: "2025-02-28T11:20:00Z"
  },
  {
    id: "RA-2025-004",
    title: "Camping Trip Hazard Analysis",
    activityName: "Overnight Camping Trip",
    date: "2025-07-10T08:00:00Z",
    status: "draft",
    riskLevel: "high",
    assessor: "Michael Davis",
    lastUpdated: "2025-03-10T16:45:00Z"
  },
  {
    id: "RA-2025-005",
    title: "Concert Setup Safety",
    activityName: "End of Year Concert",
    date: "2025-06-28T18:00:00Z",
    status: "requires-revision",
    riskLevel: "medium",
    assessor: "Lisa Rodriguez",
    lastUpdated: "2025-03-12T10:15:00Z"
  },
  {
    id: "RA-2025-006",
    title: "Chemistry Lab Experiment",
    activityName: "Advanced Chemistry Workshop",
    date: "2025-04-10T13:00:00Z",
    status: "rejected",
    riskLevel: "critical",
    assessor: "Dr. Robert Thompson",
    lastUpdated: "2025-03-08T09:20:00Z"
  }
] as const

export default function RiskAssessmentPage() {
  return (
    <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Risk Assessment</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Create and manage risk assessments for all activities in your institution.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button size="lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Assessment
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium mb-4">Quick Filters</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">All Assessments</Button>
          <Button variant="outline" size="sm">Drafts</Button>
          <Button variant="outline" size="sm">Pending Approval</Button>
          <Button variant="outline" size="sm">High Risk</Button>
          <Button variant="outline" size="sm">My Assessments</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {riskAssessments.map((assessment) => (
          <RiskAssessmentCard
            key={assessment.id}
            {...assessment}
            onClick={() => console.log(`View assessment ${assessment.id}`)}
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline">
          Load More Assessments
        </Button>
      </div>
    </div>
  )
}