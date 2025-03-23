"use client"

import React from 'react'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import { 
  Building, 
  Wrench, 
  Calendar, 
  Clipboard, 
  HardHat, 
  FileCheck, 
  Ruler, 
  AlertTriangle, 
  CheckCircle2 
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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

interface AppCardProps {
  title: string
  description: string
  icon: React.ElementType
  color: string
  href: string
  features: string[]
}

// Estate Management Apps
const estateApps: AppCardProps[] = [
  {
    title: "Maintenance Management",
    description: "Schedule and track maintenance activities across all facilities",
    icon: Wrench,
    color: "text-blue-500 dark:text-blue-400",
    href: "/modules/estate-management/maintenance",
    features: [
      "Work order management",
      "Preventive maintenance scheduling",
      "Asset tracking",
      "Maintenance history",
      "Service provider management"
    ]
  },
  {
    title: "Space Planning",
    description: "Optimize and manage space allocation throughout your facilities",
    icon: Ruler,
    color: "text-purple-500 dark:text-purple-400",
    href: "/modules/estate-management/space-planning",
    features: [
      "Room utilization tracking",
      "Space allocation planning",
      "Visual floor plans",
      "Capacity management",
      "Space usage reporting"
    ]
  },
  {
    title: "Facilities Booking",
    description: "Streamline the booking process for all campus facilities",
    icon: Calendar,
    color: "text-green-500 dark:text-green-400",
    href: "/modules/estate-management/booking",
    features: [
      "Room reservations",
      "Equipment booking",
      "Availability calendar",
      "Booking approval workflow",
      "Conflict resolution"
    ]
  },
  {
    title: "Asset Management",
    description: "Track and manage all physical assets across your institution",
    icon: Clipboard,
    color: "text-amber-500 dark:text-amber-400",
    href: "/modules/estate-management/assets",
    features: [
      "Asset inventory",
      "Depreciation tracking",
      "QR code asset tagging",
      "Asset lifecycle management",
      "Audit preparation"
    ]
  },
  {
    title: "Project Management",
    description: "Plan and execute construction and renovation projects efficiently",
    icon: HardHat,
    color: "text-red-500 dark:text-red-400",
    href: "/modules/estate-management/projects",
    features: [
      "Project planning",
      "Budget tracking",
      "Contractor management",
      "Timeline visualization",
      "Project documentation"
    ]
  },
  {
    title: "Compliance Management",
    description: "Ensure all facilities meet safety and regulatory requirements",
    icon: FileCheck,
    color: "text-indigo-500 dark:text-indigo-400",
    href: "/modules/estate-management/compliance",
    features: [
      "Regulatory tracking",
      "Inspection scheduling",
      "Compliance documentation",
      "Certificate management",
      "Remediation planning"
    ]
  },
  {
    title: "Health & Safety",
    description: "Manage and document health and safety across all facilities",
    icon: AlertTriangle,
    color: "text-orange-500 dark:text-orange-400",
    href: "/modules/estate-management/health-safety",
    features: [
      "Risk assessments",
      "Incident reporting",
      "Safety audit management",
      "Training records",
      "Action plan tracking"
    ]
  },
  {
    title: "Sustainability Tracking",
    description: "Monitor and improve environmental impact of your facilities",
    icon: CheckCircle2,
    color: "text-emerald-500 dark:text-emerald-400",
    href: "/modules/estate-management/sustainability",
    features: [
      "Energy consumption tracking",
      "Waste management",
      "Carbon footprint calculation",
      "Sustainability initiatives",
      "Environmental reporting"
    ]
  }
]

function AppCard({ title, description, icon: Icon, color, href, features }: AppCardProps) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 border-t-4" style={{ borderTopColor: `var(--${color.split('-')[1]}-500)` }}>
        <CardHeader className="pb-2">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-${color.split(' ')[0]}/10`}>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <div className={`mr-2 mt-1 text-${color.split(' ')[0]}`}>•</div>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Link href={href} className="w-full">
            <Button variant="outline" className="w-full">
              Explore {title}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default function EstateManagementPage() {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Subtle background shading for light mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-amber-50 opacity-70 dark:opacity-0 pointer-events-none" />
      
      {/* Subtle background shading for dark mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-950/30 via-slate-900 to-amber-950/30 opacity-0 dark:opacity-30 pointer-events-none" />
      
      <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-12">
          {/* Hero Section */}
          <motion.div 
            className="text-center lg:text-left max-w-3xl mx-auto lg:mx-0"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="flex items-center justify-center lg:justify-start mb-6" variants={itemVariants}>
              <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mr-4">
                <Building className="w-8 h-8 text-amber-500 dark:text-amber-400" />
              </div>
              <h1 className="text-4xl font-bold">Estate Management</h1>
            </motion.div>
            
            <motion.p className="text-xl text-muted-foreground mb-8" variants={itemVariants}>
              Comprehensive solution for managing school facilities, assets, and spaces efficiently. Our Estate Management module helps educational institutions maintain, optimize, and plan their physical environments.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <AnimatedButton variant="default" size="lg">Get Started</AnimatedButton>
              <AnimatedButton variant="outline" size="lg">Watch Demo</AnimatedButton>
            </motion.div>
          </motion.div>
          
          {/* Statistics Section */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {[
              { label: "Maintained Assets", value: "5,000+" },
              { label: "Space Efficiency", value: "34% Improved" },
              { label: "Compliance Rate", value: "99.8%" },
              { label: "Cost Reduction", value: "27% Average" }
            ].map((stat, index) => (
              <Card key={index} className="text-center bg-muted/50">
                <CardContent className="pt-6">
                  <p className="text-3xl font-bold mb-2">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
          
          {/* Apps Section */}
          <div className="space-y-6">
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-2">Estate Management Apps</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our suite of specialized applications to manage every aspect of your educational facilities
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {estateApps.map((app, index) => (
                <AppCard key={index} {...app} />
              ))}
            </motion.div>
          </div>
          
          {/* CTA Section */}
          <motion.div 
            className="bg-amber-100 dark:bg-amber-900/30 rounded-xl p-8 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4">Ready to transform your facility management?</h2>
            <p className="mb-6 text-muted-foreground max-w-2xl mx-auto">
              Join hundreds of educational institutions that have streamlined their estate management with Schoolgle.
            </p>
            <AnimatedButton size="lg" withArrow>
              Request a Free Demo
            </AnimatedButton>
          </motion.div>
        </div>
      </div>
    </div>
  )
}