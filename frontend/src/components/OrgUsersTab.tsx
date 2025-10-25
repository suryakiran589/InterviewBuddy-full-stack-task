import { Edit2, Trash2 } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

interface UsersTabProps {
  users: User[];
  onAddUser: () => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (id: number) => void;
}

export default function UsersTab({ users, onAddUser, onEditUser, onDeleteUser }: UsersTabProps) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-base md:text-lg font-semibold">Users</h2>
        <button
          onClick={onAddUser}
          className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded hover:bg-purple-700"
        >
          + Add User
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-y">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">#</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Phone</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Role</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((u, i) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{i + 1}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{u.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{u.email}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{u.phone}</td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      u.role === "ADMIN"
                        ? "bg-green-50 text-green-700"
                        : "bg-orange-50 text-orange-700"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => onEditUser(u)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteUser(u.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-center py-12 text-gray-500">No users yet</div>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {users.map((u, i) => (
          <div key={u.id} className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 font-medium">{i + 1}</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">{u.name}</p>
                  <p className="text-xs text-gray-600">{u.email}</p>
                </div>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  u.role === "ADMIN"
                    ? "bg-green-50 text-green-700"
                    : "bg-orange-50 text-orange-700"
                }`}
              >
                {u.role}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{u.phone}</span>
              <div className="flex items-center gap-3">
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => onEditUser(u)}
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteUser(u.id)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {users.length === 0 && (
          <div className="text-center py-12 text-gray-500">No users yet</div>
        )}
      </div>
    </div>
  );
}