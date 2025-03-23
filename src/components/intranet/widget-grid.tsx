"use client";

import React from 'react';
import { DraggableWidget } from './draggable-widget';
import { Button } from '@/components/ui/button';

// Simple placeholder implementation until dnd-kit is installed
export function WidgetGrid({ editMode, schoolId }: { 
  editMode: boolean,
  widgets?: any[],
  schoolId?: string,
  onWidgetsChange?: (widgets: any[]) => void 
}) {
  // Mock widgets data
  const defaultWidgets = [
    { id: "widget-1", type: 'video', title: 'School Highlights', content: 'https://example.com/school-video.mp4' },
    { id: "widget-2", type: 'image', title: 'School Gallery', content: '' },
    { id: "widget-3", type: 'text', title: 'Principal\'s Message', content: 'Welcome to our school! We are committed to providing an excellent education for all students...' },
    { id: "widget-4", type: 'calendar', title: 'Upcoming Events', content: '' },
    { id: "widget-5", type: 'social', title: 'Social Media', content: '' },
    { id: "widget-6", type: 'links', title: 'Quick Links', content: '' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {defaultWidgets.map((widget) => (
          <DraggableWidget 
            key={widget.id}
            widget={widget}
            editMode={editMode}
          />
        ))}
      </div>
      
      {editMode && (
        <div className="flex justify-center mt-6">
          <Button variant="outline" className="w-full max-w-xs mx-auto">
            Add New Widget
          </Button>
        </div>
      )}
    </div>
  );
}