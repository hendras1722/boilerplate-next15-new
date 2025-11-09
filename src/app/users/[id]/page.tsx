import { revalidatePath } from "next/cache";

type User = {
  id: number;
  name: string;
  email: string;
};

// 🚀 Server function ambil data
async function getUsers(): Promise<User[]> {
  // Contoh API gratis placeholder
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
}

// 🧠 Server Action untuk tombol refresh
async function refreshData() {
  "use server";
  // revalidatePath akan memaksa halaman di-render ulang dari server
  revalidatePath("/users");
}

// 🌐 Halaman utama (Server Component)
export default async function UsersPage({ params }: Readonly<{ params: { id: string } }>) {
  const users  = await getUsers();
  const { id } = await params;
  console.log(id, "iniparams");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Daftar Pengguna</h1>

          {/* 🔄 Tombol Refresh */}
          <form action={refreshData}>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all"
            >
              🔄 Refresh
            </button>
          </form>
        </div>

        {/* 📋 List Data */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 space-y-3 shadow-lg">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.id}
                className="flex justify-between items-center py-2 border-b border-slate-600 last:border-none"
              >
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-slate-300">{user.email}</p>
                </div>
                <span className="text-slate-400 text-xs">ID: {user.id}</span>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-400 py-8">Tidak ada data pengguna.</p>
          )}
        </div>
      </div>
    </div>
  );
}
