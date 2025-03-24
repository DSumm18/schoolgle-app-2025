"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SENDModulePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">SEND Dashboard</h2>
        <div className="flex items-center space-x-2"></div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="ehcp">EHCP Tracking</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* SEND Stats Cards */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total SEND Pupils</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">128</div>
                <p className="text-xs text-muted-foreground">+6 from last term</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">EHCP Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">8 pending applications</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">SEN Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">86</div>
                <p className="text-xs text-muted-foreground">+4 from last term</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Budget Utilized</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">72%</div>
                <p className="text-xs text-muted-foreground">£245,600 of £340,000</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>SEND Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">SEND overview visualization</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Pupils</CardTitle>
                <CardDescription>Recently updated pupil records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Adam Smith", yearGroup: "Year 8", status: "EHCP", lastUpdated: "2 days ago" },
                    { name: "Mia Johnson", yearGroup: "Year 3", status: "SEN Support", lastUpdated: "3 days ago" },
                    { name: "Thomas Lee", yearGroup: "Year 10", status: "EHCP", lastUpdated: "5 days ago" },
                    { name: "Sarah Williams", yearGroup: "Year 5", status: "SEN Support", lastUpdated: "1 week ago" }
                  ].map((pupil, i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-2 last:border-b-0 last:pb-0">
                      <div>
                        <h4 className="font-medium">{pupil.name}</h4>
                        <p className="text-sm text-muted-foreground">{pupil.yearGroup} • {pupil.status}</p>
                      </div>
                      <div className="text-xs text-muted-foreground">{pupil.lastUpdated}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Pupils by Primary Need</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">Primary need distribution chart</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Pupils by Year Group</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">Year group distribution chart</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>SEND Reports</CardTitle>
              <CardDescription>Generate and access SEND reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>This section will contain report generation tools and access to saved reports.</p>
                <div className="border rounded-md p-4 text-center">
                  Report functionality coming soon
                </div>
              </CardContent>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ehcp">
          <Card>
            <CardHeader>
              <CardTitle>EHCP Applications Tracking</CardTitle>
              <CardDescription>Monitor the status of EHCP applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-64 flex items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">EHCP progress tracking dashboard</p>
                </div>
              </CardContent>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}