"use client"

import React from 'react'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import { 
  Wrench, 
  ClipboardList, 
  BarChart4, 
  ArrowLeft, 
  Settings, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AnimatedButton } from '@/components/ui/animated-button'

// Animation variants
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
}

// Sample maintenance tasks data
const maintenanceTasks = [
  {
    id: 1,
    title: "HVAC Filter Replacement - North Wing",
    status: "Scheduled",
    priority: "Medium",
    dueDate: "2025-04-15",
    assignedTo: "Maintenance Team A",
    description: "Replace all air filters in the HVAC units located in the North Wing classrooms and offices."
  },
  {
    id: 2,
    title: "Science Lab Gas Line Inspection",
    status: "In Progress",
    priority: "High",
    dueDate: "2025-03-28",
    assignedTo: "External Contractor",
    description: "Annual safety inspection of gas lines in all science laboratories. Check for leaks and pressure consistency."
  },
  {
    id: 3,
    title: "Sports Hall Lighting Upgrade",
    status: "Planned",
    priority: "Medium",
    dueDate: "2025-05-20",
    assignedTo: "Electrical Team",
    description: "Replace existing lights with energy-efficient LED lighting systems throughout the sports hall."
  },
  {
    id: 4,
    title: "Emergency Exit Door Repair - East Building",
    status: "Urgent",
    priority: "Critical",
    dueDate: "2025-03-25",
    assignedTo: "Security Team",
    description: "Repair faulty emergency exit door mechanism that is not closing properly after use."
  },
  {
    id: 5,
    title: "Quarterly Elevator Maintenance",
    status: "Scheduled",
    priority: "High",
    dueDate: "2025-04-01",
    assignedTo: "External Elevator Services",
    description: "Regular quarterly maintenance of all elevators across campus. Includes safety checks and operational testing."
  }
]

// Status color mapping
const statusColors = {
  "Scheduled": "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
  "In Progress": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300",
  "Planned": "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
  "Urgent": "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
  "Completed": "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
}

// Priority color mapping
const priorityColors = {
  "Low": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  "Medium": "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
  "High": "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300",
  "Critical": "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
}

export default function MaintenanceManagementPage() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Subtle background shading for light mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 opacity-70 dark:opacity-0 pointer-events-none" />
      
      {/* Subtle background shading for dark mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-slate-900 to-blue-950/30 opacity-0 dark:opacity-30 pointer-events-none" />
      
      <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-8">
          {/* Breadcrumb & Back Link */}
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/modules/estate-management" className="flex items-center hover:text-primary">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Estate Management
            </Link>
            <span className="mx-2">/</span>
            <span>Maintenance Management</span>
          </div>
          
          {/* Hero Section */}
          <motion.div 
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="flex items-center" variants={itemVariants}>
              <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
                <Wrench className="w-7 h-7 text-blue-500 dark:text-blue-400" />
              </div>
              <h1 className="text-3xl font-bold">Maintenance Management</h1>
            </motion.div>
            
            <motion.p className="text-lg text-muted-foreground max-w-3xl" variants={itemVariants}>
              Streamline maintenance operations across your facilities with powerful scheduling, tracking, and reporting tools. Keep all your assets in optimal condition with preventive maintenance.
            </motion.p>
            
            <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
              <Button variant="default" className="gap-2">
                <ClipboardList className="w-4 h-4" />
                New Work Order
              </Button>
              <Button variant="outline" className="gap-2">
                <Calendar className="w-4 h-4" />
                Schedule Maintenance
              </Button>
              <Button variant="outline" className="gap-2">
                <BarChart4 className="w-4 h-4" />
                View Reports
              </Button>
              <Button variant="outline" className="gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {[
              { 
                label: "Pending Tasks", 
                value: "18", 
                icon: Clock, 
                color: "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30",
                change: "+2 from last week"
              },
              { 
                label: "Completed This Month", 
                value: "47", 
                icon: CheckCircle, 
                color: "text-green-500 bg-green-100 dark:bg-green-900/30",
                change: "+12% improvement"
              },
              { 
                label: "Urgent Issues", 
                value: "3", 
                icon: AlertTriangle, 
                color: "text-red-500 bg-red-100 dark:bg-red-900/30",
                change: "-2 from last week"
              },
              { 
                label: "Maintenance Requests", 
                value: "34", 
                icon: ClipboardList, 
                color: "text-blue-500 bg-blue-100 dark:bg-blue-900/30",
                change: "8 new this week"
              }
            ].map((stat, index) => (
              <Card key={index} className="border-l-4" style={{ borderLeftColor: `var(--${stat.color.split('-')[1]}-500)` }}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
          
          {/* Maintenance Tasks Section */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Maintenance Tasks</h2>
              <Button variant="outline" size="sm">View All Tasks</Button>
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Tasks</TabsTrigger>
                <TabsTrigger value="urgent">Urgent</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                {maintenanceTasks.map((task) => (
                  <Card key={task.id} className="hover:shadow-md transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{task.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs ${statusColors[task.status as keyof typeof statusColors]}`}>
                              {task.status}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                              {task.priority}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground mr-1">Due:</span>
                            {new Date(task.dueDate).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="text-muted-foreground mr-1">Assigned:</span>
                            {task.assignedTo}
                          </div>
                          <Button size="sm" variant="outline">View Details</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="urgent" className="space-y-4">
                {maintenanceTasks.filter(task => task.status === "Urgent").map((task) => (
                  <Card key={task.id} className="hover:shadow-md transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{task.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs ${statusColors[task.status as keyof typeof statusColors]}`}>
                              {task.status}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                              {task.priority}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground mr-1">Due:</span>
                            {new Date(task.dueDate).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="text-muted-foreground mr-1">Assigned:</span>
                            {task.assignedTo}
                          </div>
                          <Button size="sm" variant="outline">View Details</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="scheduled" className="space-y-4">
                {maintenanceTasks.filter(task => task.status === "Scheduled").map((task) => (
                  <Card key={task.id} className="hover:shadow-md transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{task.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs ${statusColors[task.status as keyof typeof statusColors]}`}>
                              {task.status}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                              {task.priority}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground mr-1">Due:</span>
                            {new Date(task.dueDate).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="text-muted-foreground mr-1">Assigned:</span>
                            {task.assignedTo}
                          </div>
                          <Button size="sm" variant="outline">View Details</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="in-progress" className="space-y-4">
                {maintenanceTasks.filter(task => task.status === "In Progress").map((task) => (
                  <Card key={task.id} className="hover:shadow-md transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{task.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs ${statusColors[task.status as keyof typeof statusColors]}`}>
                              {task.status}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                              {task.priority}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground mr-1">Due:</span>
                            {new Date(task.dueDate).toLocaleDateString()}
                          </div>
                          <div>
                            <span className="text-muted-foreground mr-1">Assigned:</span>
                            {task.assignedTo}
                          </div>
                          <Button size="sm" variant="outline">View Details</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </motion.div>
          
          {/* CTA Section */}
          <motion.div 
            className="mt-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl p-8 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4">Need to integrate with your existing maintenance systems?</h2>
            <p className="mb-6 text-muted-foreground max-w-2xl mx-auto">
              We provide seamless integration with popular facility management tools. Our team can help you migrate data and connect your existing systems.
            </p>
            <AnimatedButton size="lg" withArrow>
              Schedule a Consultation
            </AnimatedButton>
          </motion.div>
        </div>
      </div>
    </div>
  )
}