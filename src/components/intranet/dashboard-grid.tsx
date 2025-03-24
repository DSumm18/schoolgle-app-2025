"use client"

import React, { useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { DraggableWidget } from './draggable-widget';
import { WeatherWidget } from '@/components/dashboard/weather-widget';

interface Widget {
  id: string;
  title: string;
  type: string;
  component: React.ReactNode;
}

export function DashboardGrid() {
  const [widgets, setWidgets] = useState<Widget[]>([
    {
      id: 'weather',
      title: 'Weather',
      type: 'weather',
      component: <WeatherWidget />
    },
    // Add more widgets here as needed
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleRemoveWidget = (widgetId: string) => {
    setWidgets((prev) => prev.filter((widget) => widget.id !== widgetId));
  };

  const handleWidgetSettings = (widgetId: string) => {
    // Implement widget settings functionality
    console.log('Opening settings for widget:', widgetId);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={widgets.map((w) => w.id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {widgets.map((widget) => (
            <DraggableWidget
              key={widget.id}
              id={widget.id}
              title={widget.title}
              onRemove={() => handleRemoveWidget(widget.id)}
              onSettings={() => handleWidgetSettings(widget.id)}
              editable={true}
            >
              {widget.component}
            </DraggableWidget>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}