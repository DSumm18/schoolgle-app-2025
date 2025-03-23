"use client";

import { ModuleCard } from "@/components/ui/module-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { motion } from "framer-motion";
import { 
  Calendar, 
  ShieldAlert, 
  FileWarning, 
  FileText, 
  Users, 
  Bike, 
  Building, 
  BookOpen
} from "lucide-react";

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
    color: "bg-blue-100 text-blue-500 dark:bg-blue-900/30 dark:text-blue-300",
    gradient: "from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-900/10",
    icon: Calendar
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
    color: "bg-amber-100 text-amber-500 dark:bg-amber-900/30 dark:text-amber-300",
    gradient: "from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-900/10",
    icon: ShieldAlert
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
    color: "bg-red-100 text-red-500 dark:bg-red-900/30 dark:text-red-300",
    gradient: "from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-900/10",
    icon: FileWarning
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
    color: "bg-purple-100 text-purple-500 dark:bg-purple-900/30 dark:text-purple-300",
    gradient: "from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-900/10",
    icon: FileText
  },
  {
    id: "staff-management",
    title: "Staff Management",
    description: "Efficiently manage staff records, schedules, and performance",
    features: [
      "Staff profiles and documentation",
      "Performance evaluations",
      "Professional development tracking",
      "Certification management",
      "Substitute teacher coordination"
    ],
    color: "bg-green-100 text-green-500 dark:bg-green-900/30 dark:text-green-300",
    gradient: "from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-900/10",
    icon: Users
  },
  {
    id: "estates",
    title: "Estates & Facilities",
    description: "Manage the physical assets and infrastructure of your school",
    features: [
      "Maintenance scheduling",
      "Asset inventory management",
      "Facility booking system",
      "Resource allocation",
      "Space utilization analytics"
    ],
    color: "bg-indigo-100 text-indigo-500 dark:bg-indigo-900/30 dark:text-indigo-300",
    gradient: "from-indigo-100 to-indigo-50 dark:from-indigo-900/30 dark:to-indigo-900/10",
    icon: Building
  },
  {
    id: "extracurricular",
    title: "Extracurricular Activities",
    description: "Organize and manage after-school programs and activities",
    features: [
      "Club and activity management",
      "Event scheduling",
      "Student participation tracking",
      "Parent permission slips",
      "Equipment inventory"
    ],
    color: "bg-orange-100 text-orange-500 dark:bg-orange-900/30 dark:text-orange-300",
    gradient: "from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-900/10",
    icon: Bike
  },
  {
    id: "curriculum",
    title: "Curriculum Management",
    description: "Streamline curriculum planning, delivery, and assessment",
    features: [
      "Curriculum mapping",
      "Lesson planning templates",
      "Standards alignment",
      "Resource sharing",
      "Assessment creation"
    ],
    color: "bg-cyan-100 text-cyan-500 dark:bg-cyan-900/30 dark:text-cyan-300",
    gradient: "from-cyan-100 to-cyan-50 dark:from-cyan-900/30 dark:to-cyan-900/10",
    icon: BookOpen
  }
];

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
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
};

export default function ModulesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-block mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1 rounded-full">
              <div className="bg-gradient-to-r from-primary to-primary-foreground bg-background h-1 w-16 rounded-full"></div>
            </div>
          </motion.div>
          <motion.h1 
            className="text-4xl font-bold mb-4"
            variants={itemVariants}
          >
            Schoolgle Modules
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Our specialized modules are designed to address the unique challenges faced by educational institutions.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {modules.map((module, index) => (
            <motion.div key={module.id} variants={itemVariants}>
              <ModuleCard
                title={module.title}
                description={module.description}
                href={`/modules/${module.id}`}
                icon={module.icon}
                color={module.color}
                gradient={module.gradient}
              />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="mx-auto w-20 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mb-6" />
          <h2 className="text-2xl font-semibold mb-4">Need a Custom Module?</h2>
          <p className="mb-6 text-muted-foreground max-w-2xl mx-auto">
            We understand that every educational institution has unique requirements. 
            Contact us to discuss how we can create a custom module tailored to your specific needs.
          </p>
          <AnimatedButton size="lg" withArrow>
            Contact Our Team
          </AnimatedButton>
        </motion.div>
      </div>
    </div>
  );
}