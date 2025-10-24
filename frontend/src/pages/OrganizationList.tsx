import  { useEffect, useState } from "react";
import { apiDelete, apiGet, apiPost } from "../utils/api";

interface Organization {
  id: number;
  name: string;
  slug: string;
  email: string;
  status: string;
}

export default function OrganizationsList() {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", slug: "", email: "", contactPhone: "" });

  useEffect(() => {
    loadOrgs();
  }, []);

  async function loadOrgs() {
    const data = await apiGet("/organizations");
    setOrgs(data);
  }

  async function addOrganization() {
    await apiPost("/organizations", form);
    setShowModal(false);
    setForm({ name: "", slug: "", email: "", contactPhone: "" });
    loadOrgs();
  }

  async function deleteOrganisation(id:number){
    await apiDelete("/organizations/"+id)
    loadOrgs()
  }

  return (

    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="border-2 border-black px-3 py-1 font-bold text-sm">
            LOGO
          </div>
          
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-600">🔔</button>
          <button className="text-gray-600">🔔</button>
          <button className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            👤
          </button>
        </div>
        
      </header>
        <nav className="flex gap-6 text-sm px-10 pt-4">
            <span className="text-gray-500">Dashboard</span>
            <span className="text-purple-600 font-medium border-b-2 border-purple-600 pb-4">
              Manage B2B organizations
            </span>
          </nav>
      {/* Main Content */}
      <div className="p-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <span>🏠</span>
          <span>›</span>
          <span>Manage B2B organizations</span>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold">B2B organizations</h1>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-purple-700"
              onClick={() => setShowModal(true)}
            >
              + Add organization
            </button>
          </div>

          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left text-sm text-gray-600">
                <th className="pb-3 font-medium">Sr. No</th>
                <th className="pb-3 font-medium">Organizations</th>
                <th className="pb-3 font-medium">Pending requests</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {orgs.map((org, i) => (
                <tr key={org.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 text-sm">{i + 1}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-purple-100"></div>
                      <span className="text-sm">{org.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm">45 pending requests</td>
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                        org.status === "ACTIVE"
                          ? "bg-green-50 text-green-700"
                          : org.status === "BLOCKED"
                          ? "bg-red-50 text-red-700"
                          : "bg-gray-50 text-gray-600"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        org.status === "ACTIVE"
                          ? "bg-green-700"
                          : org.status === "BLOCKED"
                          ? "bg-red-700"
                          : "bg-gray-600"
                      }`}></span>
                      {org.status.charAt(0) + org.status.slice(1).toLowerCase()}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a href={`/organization/${org.id}`} className="text-gray-400 hover:text-gray-600">👁</a>
                      <button onClick={() =>{
                        deleteOrganisation(org.id)
                      }} className="text-gray-400 hover:text-red-600">🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-lg w-[500px] shadow-xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold">Add Organization</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Name of the organization
                  </label>
                  <input
                    type="text"
                    placeholder="Text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Slug</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Organization mail
                  </label>
                  <input
                    type="email"
                    placeholder="Type here"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Contact</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={form.contactPhone}
                    onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700"
                onClick={addOrganization}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
