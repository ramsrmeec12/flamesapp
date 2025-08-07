import React, { useEffect, useState } from 'react';
import { getSubmissions, deleteSubmission } from '../utils/firebase';

export default function Admin() {
  const [submissions, setSubmissions] = useState([]);

  const fetchData = async () => {
    const data = await getSubmissions();
    setSubmissions(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteSubmission(id);
    fetchData(); // refresh list after deletion
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">FLAMES Submissions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Your Name</th>
              <th className="px-6 py-3 text-left">Crush Name</th>
              <th className="px-6 py-3 text-left">Result</th>
              <th className="px-6 py-3 text-left">Time</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {submissions.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="px-6 py-4">{item.yourName}</td>
                <td className="px-6 py-4">{item.crushName}</td>
                <td className="px-6 py-4 font-semibold text-purple-700">{item.result || '---'}</td>
                <td className="px-6 py-4">
                  {item.timestamp
                    ? new Date(item.timestamp.seconds * 1000).toLocaleString()
                    : '---'}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete ❌
                  </button>
                </td>
              </tr>
            ))}
            {submissions.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
