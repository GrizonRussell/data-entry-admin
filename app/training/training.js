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

export default function TrainingTable() {
  const [training, setTraining] = useState([
    { id: "0001", training: "Human Resources Manager" },
    { id: "0002", training: "Event Coordinator" },
    { id: "0003", training: "Project Manager" },
    { id: "0004", training: "Sales Trainer" },
    { id: "0005", training: "Technical Trainer" },
    { id: "0006", training: "Operation Trainer" },
    { id: "0007", training: "Sales and Marketing Trainer" },
    { id: "0008", training: "Retail Training Manager" },
  ]);

  const [newTraining, setNewTraining] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTrainingId, setEditingTrainingId] = useState(null);
  const [trainingToDelete, setTrainingToDelete] = useState(null);

  const generateNextId = () => {
    const lastId = training.length ? training[training.length - 1].id : "0000";
    const nextId = String(parseInt(lastId) + 1).padStart(4, '0');
    return nextId;
  };

  const handleSaveTraining = () => {
    if (newTraining.trim() !== '') {
      if (isEditing) {
        setTraining(training.map(t => t.id === editingTrainingId ? { id: editingTrainingId, training: newTraining } : t));
        setIsEditing(false);
        setEditingTrainingId(null);
      } else {
        const newId = generateNextId();
        setTraining([...training, { id: newId, training: newTraining }]);
      }
      setNewTraining('');
      setIsModalOpen(false);
    }
  };

  const handleRemoveTraining = (id) => {
    setTrainingToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setTraining(training.filter(t => t.id !== trainingToDelete));
    setIsDeleteModalOpen(false);
    setTrainingToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setTrainingToDelete(null);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsEditing(false);
    setNewTraining('');
  };

  const handleEditTraining = (id, training) => {
    setIsModalOpen(true);
    setIsEditing(true);
    setEditingTrainingId(id);
    setNewTraining(training);
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
        <button className="bg-green-600 text-white px-4 py-2 rounded-md">Skills</button>
        <button className="bg-green-700 text-white px-4 py-2 rounded-md">Training</button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-green-700 p-6 rounded-lg shadow-lg text-white w-96">
            <h3 className="text-xl font-bold mb-4">
              {isEditing ? 'Edit Training' : 'Add New Training'}
            </h3>
            <div className="flex space-x-2 mb-4">
              <button className="bg-green-600 text-white px-4 py-2 rounded-md">Skills</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-md">Training</button>
            </div>
            <div className="mb-4">
              <label className="block text-white mb-2">Enter Training :</label>
              <input
                type="text"
                placeholder="Enter Training"
                className="w-full p-2 border border-gray-300 rounded text-black"
                value={newTraining}
                onChange={(e) => setNewTraining(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                onClick={handleSaveTraining}
              >
                {isEditing ? 'Update' : 'Add'}
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditing(false);
                  setNewTraining('');
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-red-600 p-6 rounded-lg shadow-lg text-white w-96">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-4">Are you sure you want to delete?</p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800"
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
              <TableHead className="text-white">Data Training</TableHead>
              <TableHead className="text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {training.map((t) => (
              <TableRow key={t.id} className="bg-green-100 hover:bg-green-200 text-black">
                <TableCell className="font-medium">{t.id}</TableCell>
                <TableCell>{t.training}</TableCell>
                <TableCell>
                  <button
                    className="bg-green-600 text-white px-2 py-1 rounded-md mr-2 hover:bg-green-700"
                    onClick={() => handleEditTraining(t.id, t.training)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700"
                    onClick={() => handleRemoveTraining(t.id)}
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
// import axios from 'axios';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// const API_URL = '/api.php?endpoint=training';

// export default function TrainingTable() {
//   const [training, setTraining] = useState([]);
//   const [newTraining, setNewTraining] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingTrainingId, setEditingTrainingId] = useState(null);
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [deletingTrainingId, setDeletingTrainingId] = useState(null);

//   useEffect(() => {
//     fetchTrainingData();
//   }, []);

//   const fetchTrainingData = async () => {
//     try {
//       const response = await fetch(API_URL);
//       const data = await response.json();
//       setTraining(data);
//     } catch (error) {
//       console.error('Error fetching training data:', error);
//     }
//   };

//   const generateNextId = () => {
//     const lastId = training.length ? training[training.length - 1].id : "0000";
//     const nextId = String(parseInt(lastId) + 1).padStart(4, '0');
//     return nextId;
//   };

//   const handleSaveTraining = async () => {
//     if (newTraining.trim() !== '') {
//       const trainingData = {
//         data_id: isEditing ? editingTrainingId : generateNextId(),
//         data_training: newTraining
//       };

//       try {
//         if (isEditing) {
//           await fetch(API_URL, {
//             method: 'PUT',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(trainingData)
//           });
//           setTraining(training.map(t => t.id === editingTrainingId ? trainingData : t));
//         } else {
//           await fetch(API_URL, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(trainingData)
//           });
//           setTraining([...training, trainingData]);
//         }
//         setIsEditing(false);
//         setEditingTrainingId(null);
//         setNewTraining('');
//         setIsModalOpen(false);
//       } catch (error) {
//         console.error('Error saving training data:', error);
//       }
//     }
//   };

//   const handleRemoveTraining = async () => {
//     try {
//       await fetch(API_URL, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ data_id: deletingTrainingId })
//       });
//       setTraining(training.filter(t => t.id !== deletingTrainingId));
//       setIsConfirmModalOpen(false);
//       setDeletingTrainingId(null);
//     } catch (error) {
//       console.error('Error deleting training data:', error);
//     }
//   };

//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//     setIsEditing(false);
//     setNewTraining('');
//   };

//   const handleEditTraining = (id, training) => {
//     setIsModalOpen(true);
//     setIsEditing(true);
//     setEditingTrainingId(id);
//     setNewTraining(training);
//   };

//   const openConfirmModal = (id) => {
//     setDeletingTrainingId(id);
//     setIsConfirmModalOpen(true);
//   };

//   const closeConfirmModal = () => {
//     setIsConfirmModalOpen(false);
//     setDeletingTrainingId(null);
//   };

//   return (
//     <div className="p-4 bg-gray-50 rounded-lg relative">
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-2xl font-bold text-green-700">Data Entry</h2>
//         <button
//           className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
//           onClick={toggleModal}
//         >
//           + Add Data Entry
//         </button>
//       </div>
//       <div className="flex space-x-2 mb-4">
//         <button className="bg-green-600 text-white px-4 py-2 rounded-md">Skills</button>
//         <button className="bg-green-700 text-white px-4 py-2 rounded-md">Training</button>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
//           <div className="bg-green-700 p-6 rounded-lg shadow-lg text-white w-96">
//             <h3 className="text-xl font-bold mb-4">
//               {isEditing ? 'Edit Training' : 'Add New Training'}
//             </h3>
//             <div className="flex space-x-2 mb-4">
//               <button className="bg-green-600 text-white px-4 py-2 rounded-md">Skills</button>
//               <button className="bg-green-500 text-white px-4 py-2 rounded-md">Training</button>
//             </div>
//             <div className="mb-4">
//               <label className="block text-white mb-2">Enter Training :</label>
//               <input
//                 type="text"
//                 placeholder="Enter Training"
//                 className="w-full p-2 border border-gray-300 rounded text-black"
//                 value={newTraining}
//                 onChange={(e) => setNewTraining(e.target.value)}
//               />
//             </div>
//             <div className="flex justify-end space-x-2">
//               <button
//                 className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
//                 onClick={handleSaveTraining}
//               >
//                 {isEditing ? 'Update' : 'Add'}
//               </button>
//               <button
//                 className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
//                 onClick={() => {
//                   setIsModalOpen(false);
//                   setIsEditing(false);
//                   setNewTraining('');
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {isConfirmModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-black w-96">
//             <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
//             <p className="mb-4">Are you sure you want to delete this training entry?</p>
//             <div className="flex justify-end space-x-2">
//               <button
//                 className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
//                 onClick={handleRemoveTraining}
//               >
//                 Delete
//               </button>
//               <button
//                 className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
//                 onClick={closeConfirmModal}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <Table className="w-full">
//         <TableHeader className="bg-green-700 text-white">
//           <TableRow>
//             <TableHead className="text-white">Data ID</TableHead>
//             <TableHead className="text-white">Data Training</TableHead>
//             <TableHead className="text-white">Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {training.map((t) => (
//             <TableRow key={t.id} className="bg-green-100 hover:bg-green-200 text-black">
//               <TableCell className="font-medium">{t.id}</TableCell>
//               <TableCell>{t.training}</TableCell>
//               <TableCell>
//                 <button
//                   className="bg-green-600 text-white px-2 py-1 rounded-md mr-2 hover:bg-green-700"
//                   onClick={() => handleEditTraining(t.id, t.training)}
//                 >
//                   Update
//                 </button>
//                 <button
//                   className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700"
//                   onClick={() => openConfirmModal(t.id)}
//                 >
//                   Delete
//                 </button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }
