import React, { useState } from 'react';
import DragAndDropField from './components/DragAndDropField1';

const initialItems = [
  'Sofia',
  'Plovdiv',
  'Varna',
  'Burgas',
  'Ruse'
];

const App: React.FC = () => {
  const [items, setItems] = useState(initialItems);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [moved] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, moved);
    setItems(newItems);
  };

  return (
    <div>
      <h1>Drag and Drop Cities</h1>
      <DragAndDropField items={items} onDragEnd={handleDragEnd} />
    </div>
  );
};

export default App;