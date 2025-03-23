import { useState, useEffect } from 'react';

// Type definitions for draggable items
export type DraggableItem = {
  id: string;
  [key: string]: any;
};

// Type definition for a drag ending event
export type DragEndResult = {
  destination: {
    index: number;
  } | null;
  source: {
    index: number;
  };
};

// Reorder function used when items are dragged and dropped
export const reorder = <T extends DraggableItem>(
  list: T[],
  startIndex: number,
  endIndex: number
): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  
  // Update positions for all items
  return result.map((item, index) => ({
    ...item,
    position: index
  }));
};

// Custom hook for managing the draggable state with persistence
export const useDraggableItems = <T extends DraggableItem>(
  initialItems: T[],
  onSave?: (items: T[]) => Promise<void>
) => {
  const [items, setItems] = useState<T[]>(initialItems);
  const [isDirty, setIsDirty] = useState(false);

  // Update items when initialItems change (e.g., from a database fetch)
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  // Handle the drag end event
  const handleDragEnd = (result: DragEndResult) => {
    if (!result.destination) return;
    
    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    
    setItems(reorderedItems);
    setIsDirty(true);
  };
  
  // Save changes to the database
  const saveChanges = async () => {
    if (onSave && isDirty) {
      await onSave(items);
      setIsDirty(false);
    }
  };
  
  return {
    items,
    setItems,
    handleDragEnd,
    isDirty,
    saveChanges
  };
};

// Generate a unique ID for new items
export const generateId = () => {
  return Math.random().toString(36).substring(2, 9);
};