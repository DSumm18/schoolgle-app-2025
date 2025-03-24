"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export default function BehaviorPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Behavior Management</h1>
        <Button variant="default">
          Record New Incident
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Today's Positive Points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87</div>
                <p className="text-xs text-muted-foreground">+12% from yesterday</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Behavior Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14</div>
                <p className="text-xs text-muted-foreground">-3 from yesterday</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Students in Detention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Same as yesterday</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Behavior Points by Year Group</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-6 rounded-lg bg-muted/50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-muted-foreground">
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M8 16v-4" />
                      <path d="M12 16v-8" />
                      <path d="M16 16v-2" />
                    </svg>
                    <h3 className="mt-3 font-medium">Behavior Chart</h3>
                    <p className="text-sm text-muted-foreground mt-1">Points comparison by year group</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Recent Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { student: "Alex Johnson", year: "Year 9", incident: "Disruption in class", time: "Today, 11:20 AM" },
                    { student: "Sophie Williams", year: "Year 8", incident: "Late to lesson", time: "Today, 9:45 AM" },
                    { student: "James Smith", year: "Year 10", incident: "Uniform violation", time: "Yesterday, 2:15 PM" },
                    { student: "Emily Brown", year: "Year 7", incident: "Phone confiscated", time: "Yesterday, 10:30 AM" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-start border-b pb-2 last:border-0">
                      <div>
                        <p className="font-medium">{item.student}</p>
                        <p className="text-sm text-muted-foreground">{item.year} - {item.incident}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="incidents">
          <Card>
            <CardHeader>
              <CardTitle>Behavior Incidents</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Detailed records of behavior incidents and management actions.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards">
          <Card>
            <CardHeader>
              <CardTitle>Rewards and Recognition</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Positive behavior tracking and reward systems.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Behavior Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Generate detailed behavior analysis reports by student, class, or time period.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}