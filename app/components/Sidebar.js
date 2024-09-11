'use client';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-64 h-full bg-gray-800 text-white p-4 rounded-r-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Sidebar</h2>
      <ul>
        <li>
          <Link href="/skills" className="block py-2 px-4 hover:bg-gray-700 rounded">Skills</Link>
        </li>
        <li>
          <Link href="/training" className="block py-2 px-4 hover:bg-gray-700 rounded">Training</Link>
        </li>
      </ul>
    </div>
  );
}
