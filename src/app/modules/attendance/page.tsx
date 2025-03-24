"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function AttendancePage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Attendance</h1>
        <Button variant="default">
          Download Reports
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">School Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-muted-foreground">+1.1% from last month</p>
                <Progress className="mt-4" value={94} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Absences Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">37</div>
                <p className="text-xs text-muted-foreground">Out of 843 students</p>
                <Progress className="mt-4" value={37/8.43} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">-3 from yesterday</p>
                <Progress className="mt-4" value={12/8.43} />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Weekly Attendance Trend</CardTitle>
              </CardHeader>
              <CardContent className="h-72 flex items-center justify-center">
                <div className="text-center p-6 rounded-lg bg-muted/50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-muted-foreground">
                    <path d="M3 3v18h18"/>
                    <path d="M7 17l4-6 4 2 4-5"/>
                  </svg>
                  <h3 className="mt-3 font-medium">Analytics Visualization</h3>
                  <p className="text-sm text-muted-foreground mt-1">Attendance data by day of week</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Classes with Lowest Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "10B Mathematics", attendance: 87 },
                    { name: "9C English", attendance: 88 },
                    { name: "11A Physics", attendance: 89 },
                    { name: "8D Geography", attendance: 90 },
                    { name: "7A History", attendance: 91 }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-full flex justify-between items-center">
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="text-sm text-muted-foreground">{item.attendance}%</span>
                      </div>
                      <Progress className="ml-2 w-24" value={item.attendance} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Student Attendance Records</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Student-specific attendance data and filters will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="classes">
          <Card>
            <CardHeader>
              <CardTitle>Class Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Class and group attendance tracking features will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Generate and download attendance reports by various parameters.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}