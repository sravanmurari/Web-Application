import React from 'react';

const details = {
  'Linear Search': `🔹 Linear Search is the most basic search method.
👉 Start from the first element and go one by one.
👉 If the current element matches the key, return it.
👉 If not, continue until the end of the array.
✅ Simple to implement.
❌ Can be slow for large arrays (O(n) time).`,

  'Binary Search': `🔹 Binary Search is much faster but needs a sorted array.
👉 Start with the middle element.
👉 If it's equal to the key, you're done!
👉 If the key is smaller, search the left half.
👉 If it's larger, search the right half.
✅ Very efficient: cuts the search space in half every time.
❌ Doesn't work on unsorted arrays.`,

  'Jump Search': `🔹 Jump Search is designed for sorted arrays.
👉 Think of jumping ahead by blocks (like skipping pages).
👉 Once a block is found where the key might be, do a linear search in that block.
✅ Faster than linear search (especially when arrays are large).
❌ Still slower than binary search in many cases.`,

  'Interpolation Search': `🔹 Interpolation Search is also for sorted arrays with uniformly distributed values.
👉 It tries to estimate where the key might be using a formula.
👉 Think of it like "guessing" the index based on how far the key is from the range start.
✅ Can be very fast for evenly spaced data (like 10, 20, 30...).
❌ Not good for unevenly distributed data or small arrays.`
};

const AlgorithmDetails = ({ algorithm }) => (
  <div className="bg-white p-4 rounded shadow-md">
    <h3 className="font-semibold mb-2">📘 {algorithm} Description</h3>
    <p className="text-sm whitespace-pre-line">{details[algorithm]}</p>
  </div>
);

export default AlgorithmDetails;
