import React, { useEffect, useState } from 'react';
import { getSubmissions } from '../utils/firebase';

export default function Admin() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    getSubmissions().then(setSubmissions);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">FLAMES Submissions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Your Name</th>
              <th className="px-6 py-3 text-left">Crush Name</th>
              <th className="px-6 py-3 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="px-6 py-4">{item.yourName}</td>
                <td className="px-6 py-4">{item.crushName}</td>
                <td className="px-6 py-4">{new Date(item.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
