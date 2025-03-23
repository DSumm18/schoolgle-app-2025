import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GripVertical, X, Settings } from 'lucide-react';

interface DraggableWidgetProps {
  id: string;
  title: string;
  children: React.ReactNode;
  onRemove?: () => void;
  onSettings?: () => void;
  editable?: boolean;
}

export function DraggableWidget({
  id,
  title,
  children,
  onRemove,
  onSettings,
  editable = false,
}: DraggableWidgetProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-3 pb-0">
        <div className="flex items-center justify-between">
          {editable ? (
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing p-1"
            >
              <GripVertical className="w-4 h-4 text-muted-foreground" />
            </div>
          ) : (
            <div className="w-6" />
          )}
          
          <CardTitle className="text-sm font-medium flex-1 text-center">
            {title}
          </CardTitle>
          
          {editable && isHovered && (
            <div className="flex items-center space-x-1">
              {onSettings && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSettings();
                  }}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              )}
              {onRemove && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
          {!editable || !isHovered ? <div className="w-6" /> : null}
        </div>
      </CardHeader>
      <CardContent className="p-3">{children}</CardContent>
    </Card>
  );
}