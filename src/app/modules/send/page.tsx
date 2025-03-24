"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SENDModulePage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">SEND Module</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Special Educational Needs and Disabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Tools and resources for supporting students with special educational needs and disabilities.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This module is under development. Check back soon for more features.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}