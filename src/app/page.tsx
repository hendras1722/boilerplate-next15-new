'use client'

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import ShadcnDataTable from '@/components/Datatable';
import Modal from '@/components/modal';
import { Button } from '@/components/ui/button';
import { GetmeResponse, useGetme } from '@/actions/getme/get';

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

const columns: ColumnDef<GetmeResponse>[] = [
  {
    header: 'User Info',
    accessorKey: '_id'
  },
  {
    accessorKey: 'email',
    header: 'Role',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button className="text-sm underline">Edit</Button>
        <Button className="text-sm text-red-600 underline">Delete</Button>
      </div>
    ),
  },
];


export default function Page() {
    const getme = useGetme();
  return (
    <div className="p-4 w-full">
      <ShadcnDataTable columns={columns} data={getme.data?.data ? [getme.data?.data] : []} pageSizeOptions={[10,20,30]}  />

      <Modal />
    </div>
  );
}

// "use client";

// import { useGetme } from "@/actions/getme/get";
// import { useModalSingleton } from "@/hooks/useModal";

// export default function Modal() {
//   const getme = useGetme();
//   const modal = useModalSingleton();

//   console.log(getme)
//   const handleOpenModal = async () => {
//     modal.open({
//       title: "Berhasil",
//       content: "Data telah disimpan dengan sukses!",
//       type: "success",
//       action: () => {
//         console.log("Action clicked");
//       },
//     });
//   };

//   const handleOpenModal2 = async () => {
//     modal.open({
//       title: "Error",
//       content: "Terjadi kesalahan saat memproses data",
//       type: "error",
//     });
//   };

//   const handleOpenModal3 = async () => {
//     modal.open({
//       title: "Peringatan",
//       content: "Ini adalah modal warning",
//       type: "warning",
//     });
//   };

//   const handleOpenModal4 = async () => {
//     modal.open({
//       title: "Informasi",
//       content: "Ini adalah modal info",
//       type: "info",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-2xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">
//           Vue3 Singleton Component Pattern (React + TypeScript)
//         </h1>

//         <div className="space-y-4">
//           <button
//             type="button"
//             onClick={handleOpenModal}
//             className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors"
//           >
//             Open Modal - Success
//           </button>
//           <button
//             type="button"
//             onClick={handleOpenModal2}
//             className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors"
//           >
//             Open Modal - Error
//           </button>
//           <button
//             type="button"
//             onClick={handleOpenModal3}
//             className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded transition-colors"
//           >
//             Open Modal - Warning
//           </button>
//           <button
//             type="button"
//             onClick={handleOpenModal4}
//             className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
//           >
//             Open Modal - Info
//           </button>
//         </div>

//         <div className="mt-8 bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">
//             Cara Pakai:
//           </h2>
//           <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
//             {`// utils/useModalSingleton.ts
// import { useModalSingleton } from '@/hooks/useModal';

// // Di component
// const handleOpenModal = async () => {
//   const modal = await useModalSingleton();
//   modal.open({
//     title: 'Judul',
//     content: 'Konten modal',
//     type: 'success'
//   });
// };`}
//           </pre>
//         </div>
//       </div>
//     </div>
//   );
// }
