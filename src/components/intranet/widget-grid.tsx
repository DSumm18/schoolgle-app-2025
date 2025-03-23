"use client";

import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { DraggableWidget } from './draggable-widget';
import { Button } from '@/components/ui/button';
import { IntranetWidget, updateWidgetPositions } from '@/lib/supabase';
import { generateId } from '@/lib/dnd-utils';

interface WidgetGridProps {
  widgets: IntranetWidget[];
  editMode: boolean;
  schoolId: string;
  onWidgetsChange?: (widgets: IntranetWidget[]) => void;
}

export function WidgetGrid({ widgets: initialWidgets, editMode, schoolId, onWidgetsChange }: WidgetGridProps) {
  const [widgets, setWidgets] = useState<IntranetWidget[]>(initialWidgets);
  const [isDirty, setIsDirty] = useState(false);
  
  // Update widgets when initialWidgets change
  useEffect(() => {
    setWidgets(initialWidgets);
  }, [initialWidgets]);

  // Configure sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Minimum drag distance before activation
      },
    })
  );

  // Handle drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) {
      return;
    }
    
    setWidgets((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      
      const newItems = arrayMove(items, oldIndex, newIndex).map(
        (item, index) => ({ ...item, position: index })
      );
      
      setIsDirty(true);
      
      if (onWidgetsChange) {
        onWidgetsChange(newItems);
      }
      
      return newItems;
    });
  };

  // Save widget order to database
  const saveWidgetOrder = async () => {
    try {
      // Only send the id and position to update widget positions
      const positionUpdates = widgets.map((widget, index) => ({
        id: widget.id,
        position: index
      }));
      
      await updateWidgetPositions(positionUpdates);
      setIsDirty(false);
    } catch (error) {
      console.error('Error saving widget positions:', error);
    }
  };

  // Update widget content
  const handleWidgetUpdate = (updatedWidget: IntranetWidget) => {
    setWidgets(items => 
      items.map(item => item.id === updatedWidget.id ? updatedWidget : item)
    );
    setIsDirty(true);
    
    if (onWidgetsChange) {
      onWidgetsChange(widgets.map(item => item.id === updatedWidget.id ? updatedWidget : item));
    }
  };

  return (
    <div className="space-y-4">
      {editMode && isDirty && (
        <div className="flex justify-end">
          <Button onClick={saveWidgetOrder}>
            Save Layout Changes
          </Button>
        </div>
      )}
      
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={widgets.map(w => w.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {widgets.map((widget) => (
              <DraggableWidget 
                key={widget.id}
                widget={widget}
                editMode={editMode}
                onUpdate={handleWidgetUpdate}
                schoolId={schoolId}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      
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