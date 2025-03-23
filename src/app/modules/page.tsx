"use client";

import { ModuleCard } from "@/components/ui/module-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { motion } from "framer-motion";
import { 
  Building, 
  Users, 
  CircleDollarSign, 
  HeartPulse, 
  Book, 
  Briefcase, 
  MessageCircle, 
  ShoppingCart,
  Home
} from "lucide-react";

const modules = [
  {
    id: "my-school-intranet",
    title: "My School Intranet",
    description: "Centralized digital platform for school communication and resources",
    features: [
      "Staff and student portals",
      "Document sharing",
      "News and announcements",
      "Calendar integration",
      "Personalized dashboards"
    ],
    color: "bg-blue-100 text-blue-500 dark:bg-blue-900/30 dark:text-blue-300",
    gradient: "from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-900/10",
    icon: Home
  },
  {
    id: "estate-management",
    title: "Estate Management",
    description: "Comprehensive management of school facilities and properties",
    features: [
      "Building maintenance tracking",
      "Space allocation",
      "Asset management",
      "Health & safety compliance",
      "Work order processing"
    ],
    color: "bg-amber-100 text-amber-500 dark:bg-amber-900/30 dark:text-amber-300",
    gradient: "from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-900/10",
    icon: Building
  },
  {
    id: "people-wellbeing",
    title: "People & Wellbeing",
    description: "Supporting staff and student welfare and development",
    features: [
      "Staff wellbeing programs",
      "Professional development",
      "Mental health resources",
      "Absence management",
      "Performance reviews"
    ],
    color: "bg-green-100 text-green-500 dark:bg-green-900/30 dark:text-green-300",
    gradient: "from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-900/10",
    icon: HeartPulse
  },
  {
    id: "finance",
    title: "Finance",
    description: "Streamlined financial management for educational institutions",
    features: [
      "Budget planning and tracking",
      "Expense management",
      "Funding allocation",
      "Financial reporting",
      "Audit preparation"
    ],
    color: "bg-emerald-100 text-emerald-500 dark:bg-emerald-900/30 dark:text-emerald-300",
    gradient: "from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-900/10",
    icon: CircleDollarSign
  },
  {
    id: "send",
    title: "SEND",
    description: "Special Educational Needs and Disabilities support system",
    features: [
      "Individual education plans",
      "Progress monitoring",
      "Resource allocation",
      "Parent communication",
      "Regulatory compliance"
    ],
    color: "bg-purple-100 text-purple-500 dark:bg-purple-900/30 dark:text-purple-300",
    gradient: "from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-900/10",
    icon: Users
  },
  {
    id: "teaching-learning",
    title: "Teaching & Learning",
    description: "Tools to enhance educational delivery and assessment",
    features: [
      "Curriculum management",
      "Lesson planning",
      "Assessment tracking",
      "Resource sharing",
      "Student progress monitoring"
    ],
    color: "bg-indigo-100 text-indigo-500 dark:bg-indigo-900/30 dark:text-indigo-300",
    gradient: "from-indigo-100 to-indigo-50 dark:from-indigo-900/30 dark:to-indigo-900/10",
    icon: Book
  },
  {
    id: "school-business-management",
    title: "School Business Management",
    description: "Operational management tools for efficient school administration",
    features: [
      "Policy management",
      "Compliance tracking",
      "Risk assessment",
      "Resource planning",
      "Strategic development"
    ],
    color: "bg-orange-100 text-orange-500 dark:bg-orange-900/30 dark:text-orange-300",
    gradient: "from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-900/10",
    icon: Briefcase
  },
  {
    id: "lets-talk-education",
    title: "Let's Talk Education",
    description: "Communication platform for educational discussions and collaboration",
    features: [
      "Discussion forums",
      "Best practice sharing",
      "Professional networking",
      "Expert webinars",
      "Community building"
    ],
    color: "bg-cyan-100 text-cyan-500 dark:bg-cyan-900/30 dark:text-cyan-300",
    gradient: "from-cyan-100 to-cyan-50 dark:from-cyan-900/30 dark:to-cyan-900/10",
    icon: MessageCircle
  },
  {
    id: "procurement",
    title: "Procurement",
    description: "Streamlined purchasing system for educational supplies and services",
    features: [
      "Supplier management",
      "Purchase order processing",
      "Contract management",
      "Inventory tracking",
      "Cost-saving analysis"
    ],
    color: "bg-rose-100 text-rose-500 dark:bg-rose-900/30 dark:text-rose-300",
    gradient: "from-rose-100 to-rose-50 dark:from-rose-900/30 dark:to-rose-900/10",
    icon: ShoppingCart
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
    <div className="min-h-screen bg-background relative">
      {/* Subtle background shading for light mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 opacity-70 dark:opacity-0 pointer-events-none" />
      
      {/* Subtle background shading for dark mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 opacity-0 dark:opacity-30 pointer-events-none" />
      
      <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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