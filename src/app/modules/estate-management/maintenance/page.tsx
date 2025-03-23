"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MaintenancePage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Maintenance Requests</h1>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-blue-500" />
              Maintenance Request System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The Maintenance Request system is currently being developed. Please check back later.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Module Under Construction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This section of the Estate Management module is currently being developed. Please check back later.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}