"use client";

import { useState } from "react";
import { 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  Search, 
  BarChart3, 
  ChevronLeft, 
  Plus, 
  Download, 
  Upload, 
  MoreHorizontal,
  ArrowUpDown,
  Check,
  PieChart
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

// Sample data
const mockAssessments = [
  {
    id: 1,
    name: "End of Term Mathematics Assessment",
    subject: "Mathematics",
    year: "Year 8",
    date: "2025-03-17",
    status: "Completed",
    averageScore: 72,
    submissions: 28,
    totalStudents: 30,
    type: "Summative"
  },
  {
    id: 2,
    name: "Weekly Science Quiz",
    subject: "Science",
    year: "Year 7",
    date: "2025-03-21",
    status: "In Progress",
    averageScore: 68,
    submissions: 18,
    totalStudents: 32,
    type: "Formative"
  },
  {
    id: 3,
    name: "English Literature Essay - Shakespeare",
    subject: "English",
    year: "Year 9",
    date: "2025-03-15",
    status: "Marking",
    averageScore: 65,
    submissions: 29,
    totalStudents: 29,
    type: "Summative"
  },
  {
    id: 4,
    name: "Geography Field Study Report",
    subject: "Geography",
    year: "Year 10",
    date: "2025-03-12",
    status: "Completed",
    averageScore: 76,
    submissions: 26,
    totalStudents: 28,
    type: "Summative"
  },
  {
    id: 5,
    name: "French Vocabulary Test",
    subject: "French",
    year: "Year 8",
    date: "2025-03-20",
    status: "Scheduled",
    averageScore: null,
    submissions: 0,
    totalStudents: 30,
    type: "Formative"
  },
  {
    id: 6,
    name: "Physics Forces Quiz",
    subject: "Physics",
    year: "Year 11",
    date: "2025-03-14",
    status: "Completed",
    averageScore: 82,
    submissions: 25,
    totalStudents: 25,
    type: "Formative"
  },
  {
    id: 7,
    name: "Art Portfolio Review",
    subject: "Art",
    year: "Year 10",
    date: "2025-03-18",
    status: "Marking",
    averageScore: 79,
    submissions: 24,
    totalStudents: 24,
    type: "Summative"
  },
  {
    id: 8,
    name: "History Source Analysis",
    subject: "History",
    year: "Year 9",
    date: "2025-03-22",
    status: "Scheduled",
    averageScore: null,
    submissions: 0,
    totalStudents: 28,
    type: "Summative"
  }
];

// Color mapping for status badges
const statusColors = {
  "Completed": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  "Marking": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  "Scheduled": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  "Draft": "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
};

// Color mapping for assessment types
const typeColors = {
  "Summative": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
  "Formative": "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400",
  "Diagnostic": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
};

export default function AssessmentTrackerPage() {
  const [assessments, setAssessments] = useState(mockAssessments);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  // Filtered and sorted assessments
  const filteredAssessments = assessments
    .filter(assessment => {
      const matchesSearch = assessment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        assessment.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSubject = selectedSubject === "All" || assessment.subject === selectedSubject;
      const matchesYear = selectedYear === "All" || assessment.year === selectedYear;
      return matchesSearch && matchesSubject && matchesYear;
    })
    .sort((a, b) => {
      if (sortField === "date") {
        return sortDirection === "asc" 
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortField === "name") {
        return sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortField === "averageScore") {
        // Handle null values for scheduled assessments
        if (a.averageScore === null && b.averageScore === null) return 0;
        if (a.averageScore === null) return 1;
        if (b.averageScore === null) return -1;
        return sortDirection === "asc"
          ? a.averageScore - b.averageScore
          : b.averageScore - a.averageScore;
      }
      return 0;
    });

  // Toggle sort direction
  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Get unique subjects and years for filters - using Array.from for better compatibility
  const subjects = ["All", ...Array.from(new Set(assessments.map(a => a.subject)))];
  const years = ["All", ...Array.from(new Set(assessments.map(a => a.year)))];

  // Analytics calculations
  const completedAssessments = assessments.filter(a => a.status === "Completed");
  const averageScoreOverall = completedAssessments.length > 0 
    ? completedAssessments.reduce((acc, curr) => acc + curr.averageScore, 0) / completedAssessments.length 
    : 0;
  
  const submissionRate = assessments.reduce((acc, curr) => acc + curr.submissions, 0) / 
    assessments.reduce((acc, curr) => acc + curr.totalStudents, 0) * 100;
  
  const statusCounts = assessments.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <a href="/modules" className="hover:text-primary">Modules</a>
        <ChevronRight className="h-4 w-4 mx-1" />
        <a href="/modules/teaching-learning" className="hover:text-primary">Teaching & Learning</a>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-foreground">Assessment Tracker</span>
      </div>
      
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Assessment Tracker</h1>
        <p className="text-muted-foreground">
          Track, analyze, and manage all student assessments in one place
        </p>
      </header>
      
      <Tabs defaultValue="assessments" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="assessments">Assessment List</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New Assessment
            </Button>
          </div>
        </div>
        
        <TabsContent value="assessments" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search assessments..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-32 sm:w-40">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-28 sm:w-32">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Assessment Table */}
          <div className="rounded-md border">
            <div className="bg-muted/50 p-4 grid grid-cols-12 gap-4 text-xs font-medium">
              <div className="col-span-5 md:col-span-4 flex items-center">
                <button 
                  className="flex items-center gap-1" 
                  onClick={() => toggleSort("name")}
                >
                  ASSESSMENT NAME
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </div>
              <div className="hidden md:block md:col-span-2">SUBJECT / YEAR</div>
              <div className="col-span-3 md:col-span-2 flex items-center">
                <button 
                  className="flex items-center gap-1" 
                  onClick={() => toggleSort("date")}
                >
                  DATE
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </div>
              <div className="col-span-2 md:col-span-2">STATUS</div>
              <div className="col-span-2 md:col-span-1 flex items-center">
                <button 
                  className="flex items-center gap-1" 
                  onClick={() => toggleSort("averageScore")}
                >
                  SCORE
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </div>
              <div className="hidden md:block md:col-span-1 text-right">ACTIONS</div>
            </div>
            
            <div className="divide-y">
              {filteredAssessments.map(assessment => (
                <div key={assessment.id} className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-muted/20">
                  <div className="col-span-5 md:col-span-4">
                    <p className="font-medium">{assessment.name}</p>
                    <Badge variant="outline" className={`mt-1 ${typeColors[assessment.type]}`}>{assessment.type}</Badge>
                  </div>
                  <div className="hidden md:block md:col-span-2">
                    <p>{assessment.subject}</p>
                    <p className="text-sm text-muted-foreground">{assessment.year}</p>
                  </div>
                  <div className="col-span-3 md:col-span-2">
                    {new Date(assessment.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                  <div className="col-span-2 md:col-span-2">
                    <Badge className={statusColors[assessment.status]}>{assessment.status}</Badge>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    {assessment.averageScore ? (
                      <div>
                        <div className="font-medium">{assessment.averageScore}%</div>
                        <div className="text-xs text-muted-foreground">
                          {assessment.submissions}/{assessment.totalStudents}
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-muted-foreground">Not available</div>
                    )}
                  </div>
                  <div className="hidden md:flex md:col-span-1 justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Assessment</DropdownMenuItem>
                        <DropdownMenuItem>Enter Marks</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
              
              {filteredAssessments.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  No assessments found matching your search criteria
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Average Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{averageScoreOverall.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Across {completedAssessments.length} completed assessments
                </p>
                <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-green-500" 
                    style={{ width: `${averageScoreOverall}%` }} 
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Submission Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{submissionRate.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {assessments.reduce((acc, curr) => acc + curr.submissions, 0)} submissions 
                  of {assessments.reduce((acc, curr) => acc + curr.totalStudents, 0)} expected
                </p>
                <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className="h-full bg-blue-500" 
                    style={{ width: `${submissionRate}%` }} 
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Assessment Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  {Object.entries(statusCounts).map(([status, count]) => (
                    <div key={status} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${statusColors[status].split(' ')[0]}`} />
                        <span>{status}</span>
                      </div>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Score Distribution</CardTitle>
                <CardDescription>Analysis of average scores across subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground p-12">
                  <BarChart3 className="h-24 w-24 mx-auto mb-4 opacity-50" />
                  <p>Detailed charts will be available in the full implementation</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Assessment Types</CardTitle>
                <CardDescription>Distribution by assessment type and year group</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground p-12">
                  <PieChart className="h-24 w-24 mx-auto mb-4 opacity-50" />
                  <p>Detailed charts will be available in the full implementation</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Settings</CardTitle>
              <CardDescription>Configure your assessment tracking preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Default Grade Boundaries</label>
                  <Select defaultValue="standard">
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade boundaries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (A-F)</SelectItem>
                      <SelectItem value="gcse">GCSE (9-1)</SelectItem>
                      <SelectItem value="primary">Primary (WTS/EXS/GDS)</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Notification Preferences</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select notification preferences" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All notifications</SelectItem>
                      <SelectItem value="important">Important only</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Academic Year</label>
                  <Select defaultValue="2024-2025">
                    <SelectTrigger>
                      <SelectValue placeholder="Select academic year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024-2025">2024-2025</SelectItem>
                      <SelectItem value="2023-2024">2023-2024</SelectItem>
                      <SelectItem value="2022-2023">2022-2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Data Export Format</label>
                  <Select defaultValue="excel">
                    <SelectTrigger>
                      <SelectValue placeholder="Select export format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>Connect with other school systems and export options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">SIS Integration</h4>
                    <p className="text-sm text-muted-foreground">Connect to your Student Information System</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              
              <div className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-md bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-9v14"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Gradebook Export</h4>
                    <p className="text-sm text-muted-foreground">Send results to digital gradebook</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              
              <div className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-md bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17.5v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3v1M12 7.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM18 9.5h.01M17 2.5H7a5 5 0 0 0-5 5v9a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5v-9a5 5 0 0 0-5-5Z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Parent Portal</h4>
                    <p className="text-sm text-muted-foreground">Share results with parents</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ChevronRight(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}