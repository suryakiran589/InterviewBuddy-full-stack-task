import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet, apiPost, apiPut, apiDelete } from "../utils/api";
import UserForm from "../components/UserForm";

interface Org {
  id: number;
  name: string;
  slug: string;
  email: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  websiteUrl?: string;
  timezone?: string;
  language?: string;
  status: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export default function OrganizationDetails() {
  const { id } = useParams();
  const [org, setOrg] = useState<Org | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<any>({});
  const [showUserModal, setShowUserModal] = useState(false);
  const [userForm, setUserForm] = useState<any>({
    name: "",
    email: "",
    phone: "",
    role: "COORDINATOR",
  });

  useEffect(() => {
    loadData();
  }, [id]);

  async function loadData() {
    const orgData = await apiGet(`/organizations/${id}`);
    const usersData = await apiGet(`/users/organization/${id}`);
    setOrg(orgData);
    setForm(orgData);
    setUsers(usersData);
  }

  async function saveChanges() {
    await apiPut(`/organizations/${id}`, form);
    setIsEditing(false);
    loadData();
  }

  async function addUser() {
    await apiPost(`/organizations/${id}/users`, userForm);
    setShowUserModal(false);
    setUserForm({ name: "", email: "", phone: "", role: "COORDINATOR" });
    loadData();
  }

  async function deleteUser(uid: number) {
    await apiDelete(`/users/${uid}`);
    loadData();
  }

//   if (!org) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 space-y-8">
      <a href="/" className="text-sm text-gray-600 underline">
        ← Back to Organizations
      </a>

      {/* Organization Info Card */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Organization Details</h2>
          {!isEditing ? (
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          ) : (
            <div className="space-x-2">
              <button onClick={() => setIsEditing(false)}>Cancel</button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={saveChanges}
              >
                Save
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { key: "name", label: "Organization Name" },
            { key: "slug", label: "Slug" },
            { key: "email", label: "Email" },
            { key: "contactName", label: "Contact Person" },
            { key: "contactPhone", label: "Contact Phone" },
            { key: "websiteUrl", label: "Website URL" },
            { key: "timezone", label: "Timezone" },
            { key: "language", label: "Language" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-sm text-gray-500 mb-1">
                {f.label}
              </label>
              <input
                type="text"
                disabled={!isEditing}
                value={form[f.key] || ""}
                onChange={(e) =>
                  setForm({ ...form, [f.key]: e.target.value })
                }
                className={`w-full border p-2 rounded ${
                  !isEditing ? "bg-gray-50 text-gray-600" : ""
                }`}
              />
            </div>
          ))}

          {/* Status Selector */}
          <div>
            <label className="block text-sm text-gray-500 mb-1">Status</label>
            <select
              disabled={!isEditing}
              value={form.status || "ACTIVE"}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className={`w-full border p-2 rounded ${
                !isEditing ? "bg-gray-50 text-gray-600" : ""
              }`}
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="BLOCKED">Blocked</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Users</h2>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded"
            onClick={() => setShowUserModal(true)}
          >
            + Add User
          </button>
        </div>

        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{i + 1}</td>
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.phone}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3">
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => deleteUser(u.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="text-gray-500 text-center py-6">No users yet</div>
        )}
      </div>

      {showUserModal && (
        <UserForm
          form={userForm}
          setForm={setUserForm}
          onSubmit={addUser}
          onCancel={() => setShowUserModal(false)}
        />
      )}
    </div>
  );
}
