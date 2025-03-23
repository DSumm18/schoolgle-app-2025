"use client"

import React, { useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { DraggableWidget } from './draggable-widget';

export type Widget = {
  id: string;
  title: string;
  content: React.ReactNode;
  width?: 'small' | 'medium' | 'large';
  height?: 'small' | 'medium' | 'large';
};

interface WidgetGridProps {
  widgets: Widget[];
  onWidgetsChange?: (widgets: Widget[]) => void;
  editable?: boolean;
}

export function WidgetGrid({ widgets, onWidgetsChange, editable = false }: WidgetGridProps) {
  const [items, setItems] = useState<Widget[]>(widgets);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    
    if (!over) return;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        if (onWidgetsChange) {
          onWidgetsChange(newItems);
        }
        
        return newItems;
      });
    }
  }

  const widthClass = (width?: 'small' | 'medium' | 'large') => {
    switch (width) {
      case 'small':
        return 'col-span-1';
      case 'medium':
        return 'col-span-2';
      case 'large':
        return 'col-span-3';
      default:
        return 'col-span-1';
    }
  };

  const heightClass = (height?: 'small' | 'medium' | 'large') => {
    switch (height) {
      case 'small':
        return 'row-span-1';
      case 'medium':
        return 'row-span-2';
      case 'large':
        return 'row-span-3';
      default:
        return 'row-span-1';
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-3 gap-4 auto-rows-min">
        <SortableContext items={items.map(item => item.id)} strategy={rectSortingStrategy}>
          {items.map((widget) => (
            <div 
              key={widget.id}
              className={`${widthClass(widget.width)} ${heightClass(widget.height)}`}
            >
              <DraggableWidget
                id={widget.id}
                title={widget.title}
                editable={editable}
              >
                {widget.content}
              </DraggableWidget>
            </div>
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}