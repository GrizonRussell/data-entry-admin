'use client';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function SkillsTable() {
  const [skills, setSkills] = useState([
    { id: "0001", skill: "Project Management" },
    { id: "0002", skill: "Data Visualization" },
    { id: "0003", skill: "Data Analysis" },
    { id: "0004", skill: "Computer Literacy" },
    { id: "0005", skill: "Organizational Skills" },
    { id: "0006", skill: "Technical Aptitude" },
    { id: "0007", skill: "Machine Learning" },
    { id: "0008", skill: "Leadership" },
  ]);

  const [newSkill, setNewSkill] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const generateNextId = () => {
    const lastId = skills.length ? skills[skills.length - 1].id : "0000";
    const nextId = String(parseInt(lastId) + 1).padStart(4, '0');
    return nextId;
  };

  const handleSaveSkill = () => {
    if (newSkill.trim() !== '') {
      if (isEditing) {
        setSkills(skills.map(s => s.id === editingSkillId ? { id: editingSkillId, skill: newSkill } : s));
        setIsEditing(false);
        setEditingSkillId(null);
      } else {
        const newId = generateNextId();
        setSkills([...skills, { id: newId, skill: newSkill }]);
      }
      setNewSkill('');
      setIsModalOpen(false);
    }
  };

  const handleRemoveSkill = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = () => {
    setSkills(skills.filter(s => s.id !== confirmDeleteId));
    setConfirmDeleteId(null);
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsEditing(false);
    setNewSkill('');
  };

  const handleEditSkill = (id, skill) => {
    setIsModalOpen(true);
    setIsEditing(true);
    setEditingSkillId(id);
    setNewSkill(skill);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg relative h-screen flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-4xl font-bold text-green-700">Data Entry</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          onClick={toggleModal}
        >
          + Add Data Entry
        </button>
      </div>
      <div className="flex space-x-2 mb-4">
        <button className="bg-green-700 text-white px-4 py-2 rounded-md">Skills</button>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md">Training</button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-green-700 p-6 rounded-lg shadow-lg text-white w-96">
            <h3 className="text-xl font-bold mb-4">
              {isEditing ? 'Edit Skill' : 'Add New Skill'}
            </h3>
            <div className="flex space-x-2 mb-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded-md">Skills</button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md">Training</button>
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Enter Skill :</label>
              <input
                type="text"
                placeholder="Enter Skill"
                className="w-full p-2 border border-gray-300 rounded text-black"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                onClick={handleSaveSkill}
              >
                {isEditing ? 'Update' : 'Add'}
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditing(false);
                  setNewSkill('');
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmDeleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-red-600 p-6 rounded-lg shadow-lg text-white w-96">
            <h3 className="text-xl font-bold mb-4">Are you sure you want to delete?</h3>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-900"
                onClick={confirmDelete}
              >
                Delete
              </button>
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-grow overflow-auto">
        <Table className="w-full rounded-lg overflow-hidden border border-gray-300">
          <TableHeader className="bg-green-700 text-white">
            <TableRow>
              <TableHead className="text-white">Data ID</TableHead>
              <TableHead className="text-white">Data Skill</TableHead>
              <TableHead className="text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills.map((s) => (
              <TableRow key={s.id} className="bg-green-100 hover:bg-green-200 text-black">
                <TableCell className="font-medium">{s.id}</TableCell>
                <TableCell>{s.skill}</TableCell>
                <TableCell>
                  <button
                    className="bg-green-600 text-white px-2 py-1 rounded-md mr-2 hover:bg-green-700"
                    onClick={() => handleEditSkill(s.id, s.skill)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700"
                    onClick={() => handleRemoveSkill(s.id)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}




// 'use client';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export default function SkillsTable() {
//   const router = useRouter();
//   const [skills, setSkills] = useState([]);
//   const [newSkill, setNewSkill] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingSkillId, setEditingSkillId] = useState(null);

//   useEffect(() => {
//     fetchSkills();
//   }, []);

//   const fetchSkills = async () => {
//     try {
//       const response = await fetch('http://localhost/data_entry/api.php?endpoint=skills', {
//         method: 'GET', // Changed to GET as the API uses GET for fetching skills
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await response.json();
//       setSkills(data);
//     } catch (error) {
//       console.error('Error fetching skills:', error);
//     }
//   };

//   const generateNextId = () => {
//     const lastId = skills.length ? skills[skills.length - 1].data_id : "0000";
//     const nextId = String(parseInt(lastId) + 1).padStart(4, '0');
//     return nextId;
//   };

//   const handleSaveSkill = async () => {
//     if (newSkill.trim() !== '') {
//       try {
//         if (isEditing) {
//           await fetch('http://localhost/data_entry/api.php?endpoint=skills', {
//             method: 'PUT', // Changed to PUT as the API uses PUT for updating skills
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               data_id: editingSkillId,
//               data_skills: newSkill
//             }),
//           });
//           setSkills(skills.map(skill => skill.data_id === editingSkillId ? { data_id: editingSkillId, data_skills: newSkill } : skill));
//           setIsEditing(false);
//           setEditingSkillId(null);
//         } else {
//           const newId = generateNextId();
//           await fetch('http://localhost/data_entry/api.php?endpoint=skills', {
//             method: 'POST', // Changed to POST as the API uses POST for adding skills
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               data_id: newId,
//               data_skills: newSkill
//             }),
//           });
//           setSkills([...skills, { data_id: newId, data_skills: newSkill }]);
//         }
//         setNewSkill('');
//         setIsModalOpen(false);
//       } catch (error) {
//         console.error('Error saving skill:', error);
//       }
//     }
//   };

//   const handleRemoveSkill = async (id) => {
//     try {
//       await fetch('http://localhost/data_entry/api.php?endpoint=skills', {
//         method: 'DELETE', // Changed to DELETE as the API uses DELETE for deleting skills
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           data_id: id,
//         }),
//       });
//       setSkills(skills.filter(skill => skill.data_id !== id));
//     } catch (error) {
//       console.error('Error deleting skill:', error);
//     }
//   };

//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//     setIsEditing(false);
//     setNewSkill('');
//   };

//   const handleEditSkill = (id, skill) => {
//     setIsModalOpen(true);
//     setIsEditing(true);
//     setEditingSkillId(id);
//     setNewSkill(skill);
//   };

//   const navigateToTraining = () => {
//     router.push('/training');
//   };

//   return (
//     <div className="p-4 bg-gray-50 rounded-lg relative">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-bold text-green-700">Skills Management</h2>
//         <button
//           className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
//           onClick={toggleModal}
//         >
//           + Add Skill
//         </button>
//       </div>
//       <div className="flex space-x-2 mb-4">
//         <button className="bg-green-700 text-white px-4 py-2 rounded-md">Skills</button>
//         <button
//           className="bg-green-600 text-white px-4 py-2 rounded-md"
//           onClick={navigateToTraining}
//         >
//           Training
//         </button>
//       </div>
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
//           <div className="bg-green-700 p-6 rounded-lg shadow-lg text-white w-96">
//             <h3 className="text-xl font-bold mb-4">
//               {isEditing ? 'Edit Skill' : 'Add New Skill'}
//             </h3>
//             <div className="mb-4">
//               <label className="block text-white mb-2">Enter Skill:</label>
//               <input
//                 type="text"
//                 placeholder="Enter Skill"
//                 className="w-full p-2 border border-gray-300 rounded text-black"
//                 value={newSkill}
//                 onChange={(e) => setNewSkill(e.target.value)}
//               />
//             </div>
//             <div className="flex justify-end space-x-2">
//               <button
//                 className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
//                 onClick={handleSaveSkill}
//               >
//                 {isEditing ? 'Update' : 'Add'}
//               </button>
//               <button
//                 className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
//                 onClick={() => {
//                   setIsModalOpen(false);
//                   setIsEditing(false);
//                   setNewSkill('');
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <table className="w-full bg-gray-200 rounded-lg">
//         <thead className="bg-green-700 text-white">
//           <tr>
//             <th className="p-2 text-left">Skill ID</th>
//             <th className="p-2 text-left">Skill</th>
//             <th className="p-2 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {skills.map((skill) => (
//             <tr key={skill.data_id} className="bg-gray-100 hover:bg-gray-200 text-black">
//               <td className="p-2 font-medium">{skill.data_id}</td>
//               <td className="p-2">{skill.data_skills}</td>
//               <td className="p-2">
//                 <button
//                   className="bg-green-600 text-white px-2 py-1 rounded-md mr-2 hover:bg-green-700"
//                   onClick={() => handleEditSkill(skill.data_id, skill.data_skills)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700"
//                   onClick={() => handleRemoveSkill(skill.data_id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
