import { ActivityCard } from "@/components/dashboard/activity-card"
import { Button } from "@/components/ui/button"

const activities = [
  {
    id: "act-1",
    title: "Science Fair 2025",
    date: "2025-05-15T14:00:00Z",
    status: "approved",
    location: "Main Hall",
    description: "Annual science fair showcasing student projects across all scientific disciplines. Open to all grades with prizes for top projects.",
    riskLevel: "low",
    participants: 120
  },
  {
    id: "act-2",
    title: "Field Trip: Natural History Museum",
    date: "2025-04-20T09:00:00Z",
    status: "pending",
    location: "Natural History Museum",
    description: "Educational trip to the Natural History Museum for 7th and 8th grade students. Transportation via school buses. Parent volunteers needed.",
    riskLevel: "medium",
    participants: 65
  },
  {
    id: "act-3",
    title: "Sports Day",
    date: "2025-06-05T09:30:00Z",
    status: "approved",
    location: "Sports Field",
    description: "Annual sports competition featuring track and field events, team sports, and individual competitions. Participation from all grades.",
    riskLevel: "medium",
    participants: 350
  },
  {
    id: "act-4",
    title: "Chess Tournament",
    date: "2025-03-28T13:00:00Z",
    status: "completed",
    location: "Library",
    description: "Inter-school chess competition with participants from neighboring schools. Different age categories with trophies for winners.",
    riskLevel: "low",
    participants: 45
  },
  {
    id: "act-5",
    title: "Overnight Camping Trip",
    date: "2025-07-10T08:00:00Z",
    status: "pending",
    location: "Pine Forest Camp",
    description: "Two-day camping experience for high school students. Activities include hiking, team building, nature studies, and outdoor survival skills.",
    riskLevel: "high",
    participants: 80
  },
  {
    id: "act-6",
    title: "End of Year Concert",
    date: "2025-06-28T18:00:00Z",
    status: "pending",
    location: "Auditorium",
    description: "Showcase of student musical talents featuring the school choir, orchestra, and individual performers. Open to parents and community.",
    riskLevel: "low",
    participants: 150
  }
] as const

export default function ActivityManagementPage() {
  return (
    <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Activity Management</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Create, manage, and track activities across your educational institution.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button size="lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Activity
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium mb-4">Quick Filters</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">All Activities</Button>
          <Button variant="outline" size="sm">Pending Approval</Button>
          <Button variant="outline" size="sm">Upcoming</Button>
          <Button variant="outline" size="sm">High Risk</Button>
          <Button variant="outline" size="sm">My Activities</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <ActivityCard 
            key={activity.id} 
            {...activity} 
            onClick={() => console.log(`View activity ${activity.id}`)} 
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline">
          Load More Activities
        </Button>
      </div>
    </div>
  )
}