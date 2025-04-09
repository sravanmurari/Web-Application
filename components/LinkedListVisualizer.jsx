import React, { useState, useEffect } from 'react';
import { SinglyLinkedList } from './utils/SinglyLinkedList';
import { DoublyLinkedList } from './utils/DoublyLinkedList';
import { CircularLinkedList } from './utils/CircularLinkedList';
import NodeBlock from './NodeBlock';
import ControlPanel from './ControlPanel';

const LinkedListVisualizer = ({ type }) => {
  const createList = () => {
    if (type === 'Singly Linked List') return new SinglyLinkedList();
    if (type === 'Doubly Linked List') return new DoublyLinkedList();
    if (type === 'Circular Linked List') return new CircularLinkedList();
    return new SinglyLinkedList();
  };  

  const [nodes, setNodes] = useState([]);
  const [list, setList] = useState(createList());

  useEffect(() => {
    setList(createList());
    setNodes([]);
  }, [type]);

  const refresh = () => {
    setNodes(list.toArray());
  };

  const handleAction = (action, payload) => {
    const length = list.toArray().length;

    switch (action) {
      case 'insertHead':
        if (payload === '') return alert('⚠️ Enter a value!');
        list.insertAtHead(Number(payload));
        break;

      case 'insertTail':
        if (payload === '') return alert('⚠️ Enter a value!');
        list.insertAtTail(Number(payload));
        break;

      case 'insertAt':
        if (payload.value === '' || payload.index === '') return alert('⚠️ Enter both value and index!');
        if (Number(payload.index) > length) return alert('❌ Invalid index!');
        list.insertAtIndex(Number(payload.value), Number(payload.index));
        break;

      case 'deleteAt':
        if (payload === '') return alert('⚠️ Enter index!');
        if (Number(payload) >= length) return alert('❌ Invalid index!');
        list.deleteAtIndex(Number(payload));
        break;

      case 'deleteHead':
        list.deleteHead();
        break;

      case 'deleteTail':
        list.deleteTail();
        break;

      case 'random':
        list.generateRandomList();
        break;

      default:
        console.warn('Unknown action');
    }

    refresh();
  };

  return (
    <div className="space-y-6 p-4 max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold text-center">Linked List Visualizer</h2>

      <ControlPanel onAction={handleAction} />

      <div className="flex flex-wrap items-center justify-center gap-3">
        {nodes.length === 0 ? (
          <p className="text-gray-500">No nodes. Add or generate!</p>
        ) : (
          nodes.map((node, idx) => (
            <NodeBlock
              key={node.address}
              value={node.value}
              address={node.address}
              nextAddress={node.nextAddress}
              prevAddress={node.prevAddress}
              isHead={idx === 0}
              isTail={idx === nodes.length - 1}
              isDoubly={type === 'Doubly Linked List'}
              isCircular={type === 'Circular Linked List'} // ✅ Pass isCircular
            />
          ))
        )}
      </div>
    </div>
  );
};

export default LinkedListVisualizer;
