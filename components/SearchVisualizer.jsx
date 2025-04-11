import React, { useState } from 'react';
import ControlPanel from './ControlPanel';
import AlgorithmDetails from './AlgorithmDetails';
import CodeDisplay from './CodeDisplay';

const SearchVisualizer = () => {
  const [array, setArray] = useState([]);
  const [key, setKey] = useState('');
  const [currentIndex, setCurrentIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const [logs, setLogs] = useState([]);
  const [algorithm, setAlgorithm] = useState('Linear Search');
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(array.length - 1);
  const [speed, setSpeed] = useState(400);
  const [statusMessage, setStatusMessage] = useState('');

  const generateRandomArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setArray(newArray);
    setKey('');
    setCurrentIndex(null);
    setFoundIndex(null);
    setLogs([]);
    setLow(0);
    setHigh(newArray.length - 1);
    setStatusMessage('');
  };

  const handleSearch = async () => {
    if (key === '') {
      alert('❗ Please enter a key value before searching.');
      return;
    }

    const target = parseInt(key);
    let found = false;

    setFoundIndex(null);
    setCurrentIndex(null);
    setLogs([]);
    setLow(0);
    setHigh(array.length - 1);
    setStatusMessage('');

    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    if (algorithm === 'Linear Search') {
      for (let i = 0; i < array.length; i++) {
        setCurrentIndex(i);
        setLogs(prev => [...prev, `Checking index ${i}: ${array[i]}`]);
        await delay(speed);

        if (array[i] === target) {
          setFoundIndex(i);
          setStatusMessage(`✅ Element found at index ${i}`);
          found = true;
          break;
        }
      }
    } else if (algorithm === 'Binary Search') {
      const sorted = [...array].sort((a, b) => a - b);
      setLogs(prev => [...prev, `📌 Given array is unsorted. Sorting it first...`, `📊 Sorted array: [${sorted.join(', ')}]`]);
      setArray(sorted);
      await delay(100);
      let l = 0, r = sorted.length - 1;
      setLow(l);
      setHigh(r);

      while (l <= r) {
        let mid = Math.floor((l + r) / 2);
        setCurrentIndex(mid);
        setLogs(prev => [...prev, `Checking middle index ${mid}: ${sorted[mid]}`]);
        await delay(speed);

        if (sorted[mid] === target) {
          setFoundIndex(mid);
          setStatusMessage(`✅ Element found at index ${mid}`);
          found = true;
          break;
        } else if (sorted[mid] < target) {
          setLogs(prev => [...prev, `Target > ${sorted[mid]} → Searching right`]);
          l = mid + 1;
        } else {
          setLogs(prev => [...prev, `Target < ${sorted[mid]} → Searching left`]);
          r = mid - 1;
        }

        setLow(l);
        setHigh(r);
        await delay(100);
      }
    } else if (algorithm === 'Jump Search') {
      const sorted = [...array].sort((a, b) => a - b);
      setLogs(prev => [...prev, `📌 Given array is unsorted. Sorting it first...`, `📊 Sorted array: [${sorted.join(', ')}]`]);
      setArray(sorted);
      await delay(100);
      const n = sorted.length;
      const stepSize = Math.floor(Math.sqrt(n));
      let prev = 0;
      let step = stepSize;

      while (step < n && sorted[step - 1] < target) {
        setCurrentIndex(step - 1);
        setLogs(prevLogs => [...prevLogs, `Checking block end at index ${step - 1}: ${sorted[step - 1]}`]);
        await delay(speed);
        prev = step;
        step += stepSize;
      }

      for (let i = prev; i < Math.min(step, n); i++) {
        setCurrentIndex(i);
        setLogs(prevLogs => [...prevLogs, `Checking index ${i}: ${sorted[i]}`]);
        await delay(speed);
        if (sorted[i] === target) {
          setFoundIndex(i);
          setStatusMessage(`✅ Element found at index ${i}`);
          found = true;
          break;
        }
      }
    } else if (algorithm === 'Interpolation Search') {
      const sorted = [...array].sort((a, b) => a - b);
      setLogs(prev => [...prev, `📌 Given array is unsorted. Sorting it first...`, `📊 Sorted array: [${sorted.join(', ')}]`]);
      setArray(sorted);
      await delay(100);

      let lowIdx = 0, highIdx = sorted.length - 1;
      setLow(lowIdx);
      setHigh(highIdx);

      while (lowIdx <= highIdx && target >= sorted[lowIdx] && target <= sorted[highIdx]) {
        let pos = lowIdx + Math.floor(((highIdx - lowIdx) * (target - sorted[lowIdx])) / (sorted[highIdx] - sorted[lowIdx]));
        setCurrentIndex(pos);
        setLogs(prev => [...prev, `Checking estimated index ${pos}: ${sorted[pos]}`]);
        await delay(speed);

        if (sorted[pos] === target) {
          setFoundIndex(pos);
          setStatusMessage(`✅ Element found at index ${pos}`);
          found = true;
          break;
        } else if (sorted[pos] < target) {
          setLogs(prev => [...prev, `Target > ${sorted[pos]} → Adjusting low`]);
          lowIdx = pos + 1;
        } else {
          setLogs(prev => [...prev, `Target < ${sorted[pos]} → Adjusting high`]);
          highIdx = pos - 1;
        }
        setLow(lowIdx);
        setHigh(highIdx);
        await delay(100);
      }
    }

    if (!found) {
      await delay(speed);
      setStatusMessage('❌ Element not found in the array');
    }
  };

  return (
    <div className="space-y-6">
      <ControlPanel
        array={array}
        keyVal={key}
        setKey={setKey}
        generateRandomArray={generateRandomArray}
        handleSearch={handleSearch}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        setArray={setArray}
      />

      <div className="flex items-center justify-center gap-4">
        <label className="text-sm font-medium">⏱️ Speed:</label>
        <input
          type="range"
          min="100"
          max="2000"
          step="100"
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
          className="w-48"
        />
        <span className="text-sm">{speed}ms</span>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {array.map((num, idx) => {
          let bgColor = 'bg-blue-500';
          if ((algorithm === 'Binary Search' || algorithm === 'Interpolation Search') && (idx < low || idx > high)) {
            bgColor = 'bg-gray-400';
          } else if (idx === foundIndex) {
            bgColor = 'bg-green-500';
          } else if (idx === currentIndex) {
            bgColor = 'bg-yellow-400';
          }

          return (
            <div
              key={idx}
              className={`w-12 h-12 flex items-center justify-center rounded shadow text-white font-bold text-lg ${bgColor}`}
            >
              {num}
            </div>
          );
        })}
      </div>

      <div className="bg-white p-4 rounded shadow-md max-h-48 overflow-y-auto">
        <h3 className="font-semibold mb-2">📜 Step Logs</h3>
        <ul className="text-sm list-disc ml-4">
          {logs.map((log, i) => <li key={i}>{log}</li>)}
        </ul>
      </div>

      {statusMessage && (
        <div className={`text-center font-semibold p-2 rounded ${
          statusMessage.includes('✅') ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
        }`}>
          {statusMessage}
        </div>
      )}

      <AlgorithmDetails algorithm={algorithm} />
      <CodeDisplay algorithm={algorithm} />
    </div>
  );
};

export default SearchVisualizer;
