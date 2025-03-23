"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Book, FileText, BarChart3, PenTool, Users, Calendar, Bookmark } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const apps = [
  {
    id: "assessment-tracker",
    title: "Assessment Tracker",
    description: "Track, analyze, and manage all student assessments in one place",
    icon: BarChart3,
    color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
    status: "New"
  },
  {
    id: "curriculum-planner",
    title: "Curriculum Planner",
    description: "Design and organize comprehensive curriculum plans across subjects",
    icon: Book,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    status: "Coming Soon"
  },
  {
    id: "lesson-builder",
    title: "Lesson Builder",
    description: "Create engaging, differentiated lesson plans with ease",
    icon: PenTool,
    color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    status: "Coming Soon"
  },
  {
    id: "resource-library",
    title: "Resource Library",
    description: "Access and share teaching resources across your school or trust",
    icon: Bookmark,
    color: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
    status: "Coming Soon"
  },
  {
    id: "student-progress",
    title: "Student Progress",
    description: "Monitor and visualize student progress over time",
    icon: Users,
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    status: "Coming Soon"
  },
  {
    id: "homework-manager",
    title: "Homework Manager",
    description: "Set, track, and grade homework assignments",
    icon: FileText,
    color: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
    status: "Coming Soon"
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

export default function TeachingLearningPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/modules" className="hover:text-primary">Modules</Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-foreground">Teaching & Learning</span>
      </div>

      <motion.div
        className="mb-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="inline-block mb-4">
          <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg">
            <Book className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
        </motion.div>
        <motion.h1
          className="text-3xl font-bold mb-3"
          variants={itemVariants}
        >
          Teaching & Learning
        </motion.h1>
        <motion.p
          className="text-muted-foreground max-w-3xl"
          variants={itemVariants}
        >
          Access powerful tools designed to enhance curriculum delivery, track student progress, and streamline assessment processes. Our comprehensive suite of applications supports teachers in delivering outstanding educational experiences.
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {apps.map((app) => (
          <motion.div key={app.id} variants={itemVariants}>
            <Card className="h-full overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className={`${app.color} p-2 rounded-lg`}>
                    <app.icon className="h-5 w-5" />
                  </div>
                  {app.status && (
                    <Badge 
                      variant={app.status === "New" ? "default" : "outline"} 
                      className={app.status === "Coming Soon" ? "bg-muted text-muted-foreground" : ""}
                    >
                      {app.status}
                    </Badge>
                  )}
                </div>
                <CardTitle className="mt-4">{app.title}</CardTitle>
                <CardDescription>{app.description}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-2">
                {app.status !== "Coming Soon" ? (
                  <Button asChild className="w-full">
                    <Link href={`/modules/teaching-learning/${app.id}`}>
                      Launch App
                    </Link>
                  </Button>
                ) : (
                  <Button disabled variant="outline" className="w-full">
                    Coming Soon
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="p-6 bg-muted/50 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="bg-indigo-100 dark:bg-indigo-900/30 p-4 rounded-lg">
            <Calendar className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">Professional Development Workshops</h3>
            <p className="text-muted-foreground">
              Enhance your teaching skills with our upcoming workshops on effective assessment strategies, curriculum design, and technology integration.
            </p>
          </div>
          <Button>View Schedule</Button>
        </div>
      </motion.div>
    </div>
  );
}