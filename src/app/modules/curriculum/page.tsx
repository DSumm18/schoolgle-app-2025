"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function CurriculumPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Curriculum Management</h1>
        <Button variant="default">
          Add New Curriculum
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">Across all key stages</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Lesson Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">357</div>
                <p className="text-xs text-muted-foreground">+24 this term</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Resource Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">Across all subjects</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Upcoming Curriculum Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { subject: "Mathematics", keyStage: "KS3", date: "April 15, 2025" },
                    { subject: "English Literature", keyStage: "KS4", date: "April 22, 2025" },
                    { subject: "Science", keyStage: "KS3", date: "May 5, 2025" },
                    { subject: "History", keyStage: "KS4", date: "May 12, 2025" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.subject}</p>
                        <p className="text-sm text-muted-foreground">{item.keyStage}</p>
                      </div>
                      <Badge variant="outline">{item.date}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Curriculum Update Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "English", status: "Up to date", lastUpdate: "February 2025" },
                    { name: "Mathematics", status: "Update needed", lastUpdate: "October 2024" },
                    { name: "Science", status: "In progress", lastUpdate: "January 2025" },
                    { name: "Geography", status: "Up to date", lastUpdate: "March 2025" },
                    { name: "History", status: "Up to date", lastUpdate: "March 2025" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Last updated: {item.lastUpdate}</p>
                      </div>
                      <Badge variant={
                        item.status === "Up to date" ? "default" : 
                        item.status === "In progress" ? "secondary" : "destructive"
                      }>
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subjects">
          <Card>
            <CardHeader>
              <CardTitle>Subject Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p>View and manage curriculum subjects, topics, and learning objectives.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planning">
          <Card>
            <CardHeader>
              <CardTitle>Curriculum Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Plan and organize curriculum content, sequencing, and assessment strategies.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Teaching Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Access and manage teaching resources, lesson plans, and materials.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}