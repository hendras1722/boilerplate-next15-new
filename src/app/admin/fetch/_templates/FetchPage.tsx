// "use client";

import { Form, FormField } from "@/components/form";

// import { useEffect, useState } from "react";
// import {
//   useGetPosts,
//   useCreatePost,
//   useUpdatePost,
//   usePatchPost,
//   useDeletePost,
// } from "@/actions/posts";
// import { Each, onMounted } from "use-react-utilities";
// import { Button } from "@/components/ui/button";

// export default function HttpDemoPage() {
//   const [postId, setPostId] = useState("1");
//   const [title, setTitle]   = useState("");
//   const [body, setBody]     = useState("");


//   // Hooks
//   const getPost    = useGetPosts();
//   const createPost = useCreatePost();
//   const updatePost = useUpdatePost(postId);
//   const patchPost  = usePatchPost(postId);
//   const deletePost = useDeletePost(postId);

//   // Handlers
//   const handleGetPost = async () => {
//     try {
//       await getPost.execute();
//     } catch (error) {
//       console.error("Get failed:", error);
//     }
//   };

//   const handleCreatePost = async () => {
//     if (!title || !body) return;
//     try {
//       await createPost.execute({ title, body, userId: 1 });
//       setTitle("");
//       setBody("");
//     } catch (error) {
//       console.error("Create failed:", error);
//     }
//   };

//   const handleUpdatePost = async () => {
//     if (!title || !body) return;
//     try {
//       await updatePost.execute({ title, body, userId: 1 });
//     } catch (error) {
//       console.error("Update failed:", error);
//     }
//   };

//   const handlePatchPost = async () => {
//     if (!title && !body) return;
//     try {
//       await patchPost.execute({
//         ...(title && { title }),
//         ...(body && { body }),
//       });
//     } catch (error) {
//       console.error("Patch failed:", error);
//     }
//   };

//   const handleDeletePost = async () => {
//     try {
//       await deletePost.execute();
//       getPost.reset();
//     } catch (error) {
//       console.error("Delete failed:", error);
//     }
//   };

//   onMounted(() => {
//     getPost.execute()
//   })

//   // ==================== UI ====================
//   return (
//     <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-8">

//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-4xl font-bold text-slate-800 mb-2">
//           useHttp Demo (Refactored)
//         </h1>
//         <p className="text-slate-600 mb-8">
//           All HTTP methods via reusable actions
//         </p>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* ==================== GET SECTION ==================== */}
//           <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
//             <h2 className="text-2xl font-bold text-blue-600 mb-4">
//               GET - Fetch Post
//             </h2>

//             <input
//               type="number"
//               value={postId}
//               onChange={(e) => setPostId(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg mb-4"
//               placeholder="Enter post ID"
//             />

//             <Button
//               onClick={handleGetPost}
//               disabled={getPost.loading}
//               className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg disabled:opacity-50"
//             >
//               {getPost.loading ? "Fetching..." : "Fetch Post"}
//             </Button>

//             <Each of={getPost.data ?? []} render={(post) => (
//               <div key={post.id} className="mt-4 p-4 bg-blue-50 rounded-lg">
//                 <p>
//                   <strong>ID:</strong> {post.id}
//                 </p>
//                 <p>
//                   <strong>Title:</strong> {post.title}
//                 </p>
//                 <p>
//                   <strong>Body:</strong> {post.body}
//                 </p>
//               </div>
//             )}/>
//           </div>

//           {/* ==================== POST SECTION ==================== */}
//           <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500">
//             <h2 className="text-2xl font-bold text-green-600 mb-4">
//               POST - Create Post
//             </h2>

//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg mb-3"
//               placeholder="Enter title"
//             />

//             <textarea
//               value={body}
//               onChange={(e) => setBody(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg mb-3"
//               placeholder="Enter body"
//               rows={3}
//             />

//             <Button
//               onClick={handleCreatePost}
//               disabled={createPost.loading}
//               className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg disabled:opacity-50"
//             >
//               {createPost.loading ? "Creating..." : "Create Post"}
//             </Button>
//           </div>

//           {/* ==================== PUT SECTION ==================== */}
//           <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-orange-500">
//             <h2 className="text-2xl font-bold text-orange-600 mb-4">
//               PUT - Update Post
//             </h2>

//             <Button
//               onClick={handleUpdatePost}
//               disabled={updatePost.loading}
//               className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg disabled:opacity-50"
//             >
//               {updatePost.loading ? "Updating..." : "Update Post"}
//             </Button>
//           </div>

//           {/* ==================== PATCH SECTION ==================== */}
//           <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-500">
//             <h2 className="text-2xl font-bold text-purple-600 mb-4">
//               PATCH - Partial Update
//             </h2>

//             <Button
//               onClick={handlePatchPost}
//               disabled={patchPost.loading}
//               className="w-full bg-purple-500 text-white font-semibold py-2 rounded-lg disabled:opacity-50"
//             >
//               {patchPost.loading ? "Patching..." : "Patch Post"}
//             </Button>
//           </div>

//           {/* ==================== DELETE SECTION ==================== */}
//           <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-red-500 lg:col-span-2">
//             <h2 className="text-2xl font-bold text-red-600 mb-4">
//               DELETE - Remove Post
//             </h2>

//             <button
//               onClick={handleDeletePost}
//               disabled={deletePost.loading}
//               className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg disabled:opacity-50"
//             >
//               {deletePost.loading ? "Deleting..." : "Delete Post"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { z } from 'zod';

export default function MyFormWithRenderProps() {
  const schema = z.object({
    email: z.email('Email tidak valid'), // pakai z.string().email(), bukan z.email()
    password: z.string().min(6, 'Password minimal 6 karakter'),
  });

  type LoginFormData = z.infer<typeof schema>; // Ganti nama dari FormData

  const handleSubmit = (data: LoginFormData) => { // Pakai type yang baru
    console.log(data);
    alert('wewe')
  };

  return (
    <Form onSubmit={handleSubmit} schema={schema} defaultValues={{
      email: '',
      password: ''
    }}>
      {({ formState, submit }) => (
        <>
          <FormField name="email" label="Email" required>
            <input type="email" className="w-full px-3 py-2 border rounded-md" />
          </FormField>

          <FormField name="password" label="Password" required>
            <input type="password" className="w-full px-3 py-2 border rounded-md" />
          </FormField>

          {JSON.stringify(formState)}
          <button
            onClick={submit}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            {formState.isSubmitting ? 'Loading...' : 'Submit'}
          </button>
        </>
      )}
    </Form>
  );
}
