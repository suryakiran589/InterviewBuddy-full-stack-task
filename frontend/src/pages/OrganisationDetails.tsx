import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet, apiPost, apiPut, apiDelete } from "../utils/api";
import UserForm from "../components/UserForm";
import OrgLogo from "../components/OrgLogo";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export default function OrganizationDetails() {
  const { id } = useParams();
  const [users, setUsers] = useState<User[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"basic" | "users">("basic");
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
    setForm(orgData);
    setUsers(usersData);
  }

  async function saveChanges() {
    await apiPut(`/organizations/${id}`, form);
    setIsEditing(false);
    loadData();
  }

  async function addUser() {
    await apiPost(`/users`, { ...userForm, organizationId: Number(id) });
    setShowUserModal(false);
    setUserForm({ name: "", email: "", phone: "", role: "COORDINATOR" });
    loadData();
  }

  async function deleteUser(uid: number) {
    await apiDelete(`/users/${uid}`);
    loadData();
  }

  async function handleStatusChange() {
  const newStatus =
    form.status === "ACTIVE"
      ? "BLOCKED"
      : form.status === "BLOCKED"
      ? "INACTIVE"
      : "ACTIVE";

  await apiPut(`/organizations/${id}`, { status: newStatus });
  setForm({ ...form, status: newStatus });
}

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b  py-4 ">
        <div className="flex items-center justify-between shadow-lg pb-3 px-6">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">
                LOGO
              </div>
            </div>
           
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-900">🏠</button>
            <button className="text-gray-600 hover:text-gray-900">🔔</button>
            <button className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
              👤
            </button>
          </div>
        </div>
         <nav className="flex gap-6 mt-5 text-sm px-6">
              <a href="/" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </a>
              <a
                href="/organizations"
                className="text-purple-600 font-medium border-b-2 border-purple-600 pb-4"
              >
                Manage B2B organizations
              </a>
            </nav>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white px-6 py-3 border-b">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <a href="/" className="hover:text-gray-900">
            🏠
          </a>
          <span>›</span>
          <a href="/organizations" className="hover:text-gray-900">
            Manage B2B organizations
          </a>
          <span>›</span>
          <span className="text-gray-900">Organization details</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Organization Header Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start gap-6">
            <OrgLogo organization={form}/>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {form.name || "Massachusetts Institute of Technology"}
                </h1>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span
  className={`font-medium ${
    form.status === "ACTIVE"
      ? "text-green-600"
      : form.status === "BLOCKED"
      ? "text-red-600"
      : "text-gray-600"
  }`}
>
  {form.status === "ACTIVE"
    ? "Active"
    : form.status === "BLOCKED"
    ? "Blocked"
    : "Inactive"}
</span>
                  </span>
                  <button onClick={handleStatusChange} className="text-purple-600 text-sm font-medium hover:underline">
                    Change status
                  </button>
                </div>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span>📧</span>
                  <span>{form.email || "gitam@gitam.in"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📱</span>
                  <span>{form.contactPhone || "91 - 9676456543"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🌐</span>
                  <a
                    href={form.websiteUrl || "#"}
                    className="text-purple-600 hover:underline"
                  >
                    {form.websiteUrl || "Gitam.edu"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-lg shadow-sm">
          <div className="flex border-b px-6">
            <button
              onClick={() => setActiveTab("basic")}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "basic"
                  ? "text-purple-600 border-purple-600"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              Basic details
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "users"
                  ? "text-purple-600 border-purple-600"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              Users
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "basic" && (
              <div className="space-y-6">
                {/* Profile Section */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Profile</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="w-8 h-8 flex items-center justify-center bg-purple-50 text-purple-600 rounded hover:bg-purple-100"
                  >
                    ✏️
                  </button>
                </div>

                {/* Organization Details */}
                <div>
                  <h3 className="text-base font-semibold mb-4">
                    Organization details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Organization name
                      </label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={form.name || ""}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Organization SLUG
                      </label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={form.slug || ""}
                        onChange={(e) =>
                          setForm({ ...form, slug: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm disabled:text-gray-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div>
                  <h3 className="text-base font-semibold mb-4">
                    Contact details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Primary Admin name
                      </label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={form.contactName || ""}
                        onChange={(e) =>
                          setForm({ ...form, contactName: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Primary Admin Mail-id
                      </label>
                      <input
                        type="email"
                        disabled={!isEditing}
                        value={form.email || ""}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm disabled:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Support Email ID
                      </label>
                      <input
                        type="email"
                        disabled={!isEditing}
                        value={form.contactEmail || ""}
                        onChange={(e) =>
                          setForm({ ...form, contactEmail: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm disabled:text-gray-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Phone no
                        </label>
                        <div className="flex gap-2">
                          <select
                            disabled={!isEditing}
                            className="px-2 py-2 bg-gray-50 border border-gray-200 rounded text-sm disabled:text-gray-500"
                          >
                            <option>+91</option>
                          </select>
                          <input
                            type="tel"
                            disabled={!isEditing}
                            value={form.contactPhone || ""}
                            onChange={(e) =>
                              setForm({ ...form, contactPhone: e.target.value })
                            }
                            className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm disabled:text-gray-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Alternative phone no
                        </label>
                        <div className="flex gap-2">
                          <select
                            disabled={!isEditing}
                            className="px-2 py-2 bg-gray-50 border border-gray-200 rounded text-sm disabled:text-gray-500"
                          >
                            <option>+91</option>
                          </select>
                          <input
                            type="tel"
                            disabled={!isEditing}
                            className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm disabled:text-gray-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Maximum Allowed Coordinators */}
                <div>
                  <h3 className="text-base font-semibold mb-4">
                    Maximum Allowed Coordinators
                  </h3>
                  <div className="max-w-md">
                    <label className="block text-xs text-gray-600 mb-1">
                      Max active Coordinators allowed
                    </label>
                    <select
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm disabled:text-gray-500"
                    >
                      <option>Upto 5 Coordinators</option>
                      <option>Upto 10 Coordinators</option>
                      <option>Upto 20 Coordinators</option>
                    </select>
                  </div>
                </div>

                {/* Timezone */}
                <div>
                  <h3 className="text-base font-semibold mb-4">Timezone</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Common name
                      </label>
                      <select
                        disabled={!isEditing}
                        value={form.timezone || ""}
                        onChange={(e) =>
                          setForm({ ...form, timezone: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm disabled:text-gray-500"
                      >
                        <option>India Standard Time</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Region
                      </label>
                      <select
                        disabled={!isEditing}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm disabled:text-gray-500"
                      >
                        <option>Asia/Colombo</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Language */}
                <div>
                  <h3 className="text-base font-semibold mb-4">Language</h3>
                  <div className="max-w-md">
                    <label className="block text-xs text-gray-600 mb-1">
                      Choose the language for organization
                    </label>
                    <select
                      disabled={!isEditing}
                      value={form.language || ""}
                      onChange={(e) =>
                        setForm({ ...form, language: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm disabled:text-gray-500"
                    >
                      <option>English</option>
                    </select>
                  </div>
                </div>

                {/* Official Website URL */}
                <div>
                  <h3 className="text-base font-semibold mb-4">
                    Official website URL
                  </h3>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      website URL
                    </label>
                    <input
                      type="url"
                      disabled={!isEditing}
                      value={form.websiteUrl || ""}
                      onChange={(e) =>
                        setForm({ ...form, websiteUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm disabled:text-gray-500"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveChanges}
                      className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded hover:bg-purple-700"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "users" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Users</h2>
                  <button
                    onClick={() => setShowUserModal(true)}
                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded hover:bg-purple-700"
                  >
                    + Add User
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-y">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">
                          #
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">
                          Email
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">
                          Phone
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">
                          Role
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-600">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {users.map((u, i) => (
                        <tr key={u.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {i + 1}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {u.name}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {u.email}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {u.phone}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {u.role}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => deleteUser(u.id)}
                              className="text-sm text-red-600 hover:underline"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {users.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      No users yet
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User Modal */}
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