import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const modules = [
  {
    id: "activity-management",
    title: "Activity Management",
    description: "Manage activities in educational institutions efficiently",
    features: [
      "Create and manage activities",
      "Schedule recurring activities",
      "Track participant attendance",
      "Generate activity reports",
      "Risk assessment integration"
    ],
    ctaText: "Explore Activity Management",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    iconColor: "text-blue-500"
  },
  {
    id: "risk-assessment",
    title: "Risk Assessment",
    description: "Identify and mitigate risks in educational environments",
    features: [
      "Comprehensive risk evaluation forms",
      "Risk level identification",
      "Mitigation strategy recommendations",
      "Compliance with safety regulations",
      "Historical assessment tracking"
    ],
    ctaText: "Explore Risk Assessment",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
    iconColor: "text-amber-500"
  },
  {
    id: "issue-tracker",
    title: "Issue Tracker",
    description: "Log, track, and resolve issues efficiently",
    features: [
      "Issue categorization system",
      "Priority-based triage",
      "Assignment workflow",
      "Resolution tracking",
      "Reporting and analytics"
    ],
    ctaText: "Explore Issue Tracker",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    iconColor: "text-green-500"
  },
  {
    id: "document-management",
    title: "Document Management",
    description: "Organize and manage educational documents and resources",
    features: [
      "Document organization by category",
      "Version control system",
      "Searchable document database",
      "Access control settings",
      "Integration with other modules"
    ],
    ctaText: "Explore Document Management",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    iconColor: "text-purple-500"
  }
];

export default function ModulesPage() {
  return (
    <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Schoolgle Modules</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Our specialized modules are designed to address the unique challenges faced by educational institutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {modules.map((module) => (
          <Card key={module.id} className={`border ${module.bgColor} hover:shadow-lg transition-shadow`}>
            <CardHeader>
              <div className={`w-10 h-10 rounded-full ${module.iconColor} flex items-center justify-center mb-4`}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  className="w-6 h-6"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
              <CardTitle>{module.title}</CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {module.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Link href={`/modules/${module.id}`} passHref>
                <Button className="w-full">{module.ctaText}</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Need a Custom Module?</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We understand that every educational institution has unique requirements. 
          Contact us to discuss how we can create a custom module tailored to your specific needs.
        </p>
        <Button size="lg">Contact Our Team</Button>
      </div>
    </div>
  );
}