import React from 'react';

const ControlPanel = ({ array, keyVal, setKey, generateRandomArray, handleSearch, algorithm, setAlgorithm, setArray }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <input
        className="px-3 py-1 border rounded"
        type="text"
        placeholder="Enter elements comma separated"
        onChange={(e) => setArray(e.target.value.split(',').map(Number))}
      />
      <input
        className="px-3 py-1 border rounded"
        type="number"
        placeholder="Key to search"
        value={keyVal}
        onChange={(e) => setKey(e.target.value)}
      />
      <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
        className="px-3 py-1 border rounded"
      >
        <option>Linear Search</option>
        <option>Binary Search</option>
        <option>Jump Search</option>
        <option>Interpolation Search</option>
      </select>
      <button onClick={generateRandomArray} className="bg-indigo-500 text-white px-4 py-1 rounded hover:bg-indigo-600">
        🎲 Random
      </button>
      <button onClick={handleSearch} className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
        🔍 Search
      </button>
    </div>
  );
};

export default ControlPanel;
