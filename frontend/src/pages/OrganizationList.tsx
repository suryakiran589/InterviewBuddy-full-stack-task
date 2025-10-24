import  { useEffect, useState } from "react";
import { apiGet, apiPost } from "../utils/api";

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

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Manage B2B Organizations</h1>
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          + Add Organization
        </button>
      </div>

      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">#</th>
            <th className="p-3">Organization</th>
            <th className="p-3">Email</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orgs.map((org, i) => (
            <tr key={org.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{i + 1}</td>
              <td className="p-3 font-medium">{org.name}</td>
              <td className="p-3">{org.email}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    org.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : org.status === "BLOCKED"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {org.status}
                </span>
              </td>
              <td className="p-3">
                <a
                  href={`/organization/${org.id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Add Organization</h2>
            {["name", "slug", "email", "contactPhone"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field}
                className="w-full border p-2 mb-2 rounded"
                value={(form as any)[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              />
            ))}
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button
                className="bg-purple-600 text-white px-4 py-2 rounded"
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
