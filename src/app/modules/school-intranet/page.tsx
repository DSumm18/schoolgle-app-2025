"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

export default function SchoolIntranetPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">School Intranet</h1>
        <Button variant="default">
          Customize Layout
        </Button>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-center">Weather Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold">21°C</h3>
                      <p className="text-sm text-muted-foreground">Partly Cloudy</p>
                    </div>
                    <div className="text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.5 17.5 16 19" />
                        <path d="M6.5 17.5 8 19" />
                        <path d="M8 10h8" />
                        <path d="M12 10v8" />
                        <path d="M12 2v4" />
                        <path d="m4.9 4.9 2.8 2.8" />
                        <path d="m16.3 4.9-2.8 2.8" />
                        <path d="M20 12h-4" />
                        <path d="M4 12h4" />
                      </svg>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-center">Welcome</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Good morning</h3>
                  <p className="text-sm text-muted-foreground">
                    Welcome to your school intranet. Here you'll find the latest updates and resources.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-center">Breaking News</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="relative bg-primary/10 p-2 rounded overflow-hidden">
                    <div className="whitespace-nowrap">
                      <span className="text-sm font-medium">
                        BREAKING NEWS: School sports day scheduled for next Friday
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-center">School Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-center mb-2">
                    <h3 className="font-medium">March</h3>
                  </div>
                  <div className="grid grid-cols-7 text-center text-xs">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                      <div key={day} className="py-1">{day}</div>
                    ))}
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                      <div
                        key={day}
                        className={`p-1 aspect-square flex items-center justify-center ${
                          day === 24 ? 'bg-primary text-primary-foreground rounded-full' : ''
                        } ${day > 31 ? 'text-muted-foreground' : ''}`}
                      >
                        {day <= 31 ? day : ''}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-center">Important Notices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-100 p-3 rounded-md text-sm">
                    <p className="font-medium">Important: School Closure</p>
                    <p className="text-xs mt-1">
                      The school will be closed on Monday, June 5th due to a scheduled maintenance of the heating system.
                    </p>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-100 p-3 rounded-md text-sm">
                    <p className="font-medium">Reminder: Permission Slips</p>
                    <p className="text-xs mt-1">
                      Please return all field trip permission slips by Wednesday this week.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <p>View and manage school resources here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff">
          <Card>
            <CardHeader>
              <CardTitle>Staff Portal</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Staff-specific information and tools.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Student Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Student-specific information and resources.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}