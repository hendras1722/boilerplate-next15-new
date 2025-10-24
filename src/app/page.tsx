
// import React from 'react';
// import { ColumnDef } from '@tanstack/react-table';
// import ShadcnDataTable from '@/components/Datatable';
// import Modal from '@/components/modal';

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   role: string;
// };

// const columns: ColumnDef<User>[] = [
//   {
//     header: 'User Info',
//   },
//   {
//     accessorKey: 'role',
//     header: 'Role',
//   },
//   {
//     id: 'actions',
//     header: 'Actions',
//     cell: ({ row }) => (
//       <div className="flex gap-2">
//         <button className="text-sm underline">Edit</button>
//         <button className="text-sm text-red-600 underline">Delete</button>
//       </div>
//     ),
//   },
// ];

// const data: User[] = [
//   { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
//   { id: 2, name: 'Bob', email: 'bob@example.com', role: 'Editor' },
// ];

// export default function Page() {
//   return (
//     <div className="p-4">
//       <ShadcnDataTable columns={columns} data={data} defaultPageSize={10} />

//       <Modal />
//     </div>
//   );
// }

'use client'

import { useModalSingleton } from '@/hooks/useModal';
import React from 'react';

export default function Modal() {
  const handleOpenModal = async () => {
    const modal = await useModalSingleton();
    modal.open({
      title: 'Berhasil',
      content: 'Data telah disimpan dengan sukses!',
      type: 'success',
      action: () => {
        console.log('Action clicked');
      },
    });
  };

  const handleOpenModal2 = async () => {
    const modal = await useModalSingleton();
    modal.open({
      title: 'Error',
      content: 'Terjadi kesalahan saat memproses data',
      type: 'error',
    });
  };

  const handleOpenModal3 = async () => {
    const modal = await useModalSingleton();
    modal.open({
      title: 'Peringatan',
      content: 'Ini adalah modal warning',
      type: 'warning',
    });
  };

  const handleOpenModal4 = async () => {
    const modal = await useModalSingleton();
    modal.open({
      title: 'Informasi',
      content: 'Ini adalah modal info',
      type: 'info',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Vue3 Singleton Component Pattern (React + TypeScript)
        </h1>

        <div className="space-y-4">
          <button
            onClick={handleOpenModal}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Open Modal - Success
          </button>
          <button
            onClick={handleOpenModal2}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Open Modal - Error
          </button>
          <button
            onClick={handleOpenModal3}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Open Modal - Warning
          </button>
          <button
            onClick={handleOpenModal4}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Open Modal - Info
          </button>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Cara Pakai:</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {`// utils/useModalSingleton.ts
import { useModalSingleton } from '@/hooks/useModal';

// Di component
const handleOpenModal = async () => {
  const modal = await useModalSingleton();
  modal.open({
    title: 'Judul',
    content: 'Konten modal',
    type: 'success'
  });
};`}
          </pre>
        </div>
      </div>
    </div>
  );
}
