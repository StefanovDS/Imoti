import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface DragAndDropFieldProps {
  items: string[];
  onDragEnd: (result: any) => void;
}

const DragAndDropField: React.FC<DragAndDropFieldProps> = ({ items, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="property-features">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable key={item} draggableId={item} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragAndDropField;