import React, { useState } from 'react';

const codeSnippets = {
  'Linear Search': {
    Python: `def linear_search(arr, key):\n  for i, val in enumerate(arr):\n    if val == key:\n      return i\n  return -1`,
    Java: `int linearSearch(int[] arr, int key) {\n  for (int i = 0; i < arr.length; i++) {\n    if (arr[i] == key) return i;\n  }\n  return -1;\n}`,
    C: `int linearSearch(int arr[], int n, int key) {\n  for (int i = 0; i < n; i++) {\n    if (arr[i] == key) return i;\n  }\n  return -1;\n}`
  },
  'Binary Search': {
    Python: `def binary_search(arr, key):\n  l, r = 0, len(arr) - 1\n  while l <= r:\n    mid = (l + r) // 2\n    if arr[mid] == key:\n      return mid\n    elif arr[mid] < key:\n      l = mid + 1\n    else:\n      r = mid - 1\n  return -1`,
    Java: `int binarySearch(int[] arr, int key) {\n  int l = 0, r = arr.length - 1;\n  while (l <= r) {\n    int mid = (l + r) / 2;\n    if (arr[mid] == key) return mid;\n    else if (arr[mid] < key) l = mid + 1;\n    else r = mid - 1;\n  }\n  return -1;\n}`,
    C: `int binarySearch(int arr[], int n, int key) {\n  int l = 0, r = n - 1;\n  while (l <= r) {\n    int mid = (l + r) / 2;\n    if (arr[mid] == key) return mid;\n    else if (arr[mid] < key) l = mid + 1;\n    else r = mid - 1;\n  }\n  return -1;\n}`
  },
  'Jump Search': {
    Python: `import math\ndef jump_search(arr, key):\n  n = len(arr)\n  step = int(math.sqrt(n))\n  prev = 0\n  while arr[min(step, n) - 1] < key:\n    prev = step\n    step += int(math.sqrt(n))\n    if prev >= n:\n      return -1\n  for i in range(prev, min(step, n)):\n    if arr[i] == key:\n      return i\n  return -1`,
    Java: `int jumpSearch(int[] arr, int key) {\n  int n = arr.length;\n  int step = (int)Math.floor(Math.sqrt(n));\n  int prev = 0;\n  while (arr[Math.min(step, n)-1] < key) {\n    prev = step;\n    step += (int)Math.floor(Math.sqrt(n));\n    if (prev >= n) return -1;\n  }\n  for (int i = prev; i < Math.min(step, n); i++)\n    if (arr[i] == key) return i;\n  return -1;\n}`,
    C: `int jumpSearch(int arr[], int n, int key) {\n  int step = sqrt(n);\n  int prev = 0;\n  while (arr[min(step, n)-1] < key) {\n    prev = step;\n    step += sqrt(n);\n    if (prev >= n) return -1;\n  }\n  for (int i = prev; i < min(step, n); i++)\n    if (arr[i] == key) return i;\n  return -1;\n}`
  },
  'Interpolation Search': {
    Python: `def interpolation_search(arr, key):\n  low = 0\n  high = len(arr) - 1\n  while low <= high and key >= arr[low] and key <= arr[high]:\n    pos = low + ((high - low) * (key - arr[low])) // (arr[high] - arr[low])\n    if arr[pos] == key:\n      return pos\n    if arr[pos] < key:\n      low = pos + 1\n    else:\n      high = pos - 1\n  return -1`,
    Java: `int interpolationSearch(int[] arr, int key) {\n  int low = 0, high = arr.length - 1;\n  while (low <= high && key >= arr[low] && key <= arr[high]) {\n    int pos = low + ((high - low) * (key - arr[low])) / (arr[high] - arr[low]);\n    if (arr[pos] == key) return pos;\n    if (arr[pos] < key) low = pos + 1;\n    else high = pos - 1;\n  }\n  return -1;\n}`,
    C: `int interpolationSearch(int arr[], int n, int key) {\n  int low = 0, high = n - 1;\n  while (low <= high && key >= arr[low] && key <= arr[high]) {\n    int pos = low + ((double)(high - low) / (arr[high] - arr[low])) * (key - arr[low]);\n    if (arr[pos] == key) return pos;\n    if (arr[pos] < key) low = pos + 1;\n    else high = pos - 1;\n  }\n  return -1;\n}`
  }
};

const timeComplexities = {
  'Linear Search': { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
  'Binary Search': { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
  'Jump Search': { best: 'O(1)', average: 'O(√n)', worst: 'O(√n)' },
  'Interpolation Search': { best: 'O(1)', average: 'O(log log n)', worst: 'O(n)' }
};

const CodeDisplay = ({ algorithm }) => {
  const [copiedLang, setCopiedLang] = useState('');

  const handleCopy = async (code, lang) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedLang(lang);
      setTimeout(() => setCopiedLang(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="font-semibold mb-2 text-lg">💻 {algorithm} Code</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        {Object.entries(codeSnippets[algorithm]).map(([lang, code]) => (
          <div key={lang} className="relative">
            <div className="flex items-center justify-between mb-1">
              <strong>{lang}</strong>
              <button
                onClick={() => handleCopy(code, lang)}
                className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-600 px-2 py-1 rounded"
              >
                {copiedLang === lang ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap h-48 overflow-y-auto">
              {code}
            </pre>
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm">
        <h4 className="font-semibold">⏱ Time Complexities</h4>
        <ul className="list-disc ml-5">
          <li><strong>Best Case:</strong> {timeComplexities[algorithm].best}</li>
          <li><strong>Average Case:</strong> {timeComplexities[algorithm].average}</li>
          <li><strong>Worst Case:</strong> {timeComplexities[algorithm].worst}</li>
        </ul>
      </div>
    </div>
  );
};

export default CodeDisplay;
