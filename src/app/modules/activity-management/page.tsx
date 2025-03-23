"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";

export default function ActivityManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8 mx-auto">
        <div className="flex flex-col items-center justify-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-3xl font-bold mb-2 text-center">Activity Management</h1>
            <p className="text-muted-foreground text-center max-w-xl">
              Plan, schedule, and track all school activities in a single dashboard.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  "Fire Alarm Testing - Due: April 15",
                  "Staff Training - Due: April 20",
                  "Playground Inspection - Due: April 22",
                  "HVAC Maintenance - Due: April 30"
                ].map((activity, i) => (
                  <li key={i} className="p-3 bg-muted rounded-md">{activity}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { day: "Monday", activity: "Staff Meeting (9:00 AM)", color: "bg-blue-500" },
                  { day: "Wednesday", activity: "Department Planning (2:00 PM)", color: "bg-green-500" },
                  { day: "Friday", activity: "School Assembly (8:30 AM)", color: "bg-purple-500" }
                ].map((schedule, i) => (
                  <div key={i} className={`p-3 border-l-2 ${schedule.color} pl-3`}>
                    <p className="font-medium">{schedule.day}</p>
                    <p className="text-sm text-muted-foreground">{schedule.activity}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-center mt-6">
          <Link href="/modules" passHref>
            <Button variant="outline" className="mr-2" asChild>
              <span>Back to Modules</span>
            </Button>
          </Link>
          
          <Button>Create New Activity</Button>
        </div>
      </main>
    </div>
  );
}