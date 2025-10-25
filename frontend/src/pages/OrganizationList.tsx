import { useEffect, useState } from "react";
import { Search, Home, Eye, Trash2, X, Filter, Loader2 } from "lucide-react";
import { apiDelete, apiGet, apiPost } from "../utils/api";
import Header from "../components/Header";

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
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [filteredOrgs,setFilteredOrgs] = useState<Organization[]>([])
  const [search,setSearch] = useState("")

  useEffect(() => {
    loadOrgs();
  }, []);

  async function loadOrgs() {
    try {
      setLoading(true);
      const data = await apiGet("/organizations");
      setOrgs(data);
      setFilteredOrgs(data)
    } catch (error) {
      console.error("Error loading organizations:", error);
    } finally {
      setLoading(false);
    }
  }

  async function addOrganization() {
    try {
      setSubmitting(true);
      await apiPost("/organizations", form);
      setShowModal(false);
      setForm({ name: "", slug: "", email: "", contactPhone: "" });
      loadOrgs();
    } catch (error) {
      console.error("Error adding organization:", error);
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteOrganisation(id: number) {
    try {
      await apiDelete("/organizations/" + id);
      loadOrgs();
    } catch (error) {
      console.error("Error deleting organization:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      
      <Header/>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="flex gap-4 md:gap-6 text-xs md:text-sm px-4 md:px-10 overflow-x-auto">
          <span className="text-gray-500 py-4 whitespace-nowrap">Dashboard</span>
          <span className="text-purple-600 font-medium border-b-2 border-purple-600 py-4 whitespace-nowrap">
            Manage B2B organizations
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-4 md:p-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
          <Home className="w-4 h-4" />
          <span>›</span>
          <span>Manage B2B organizations</span>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h1 className="text-lg md:text-xl font-semibold">B2B organizations</h1>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-auto border border-gray-300 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-purple-700 whitespace-nowrap"
                onClick={() => setShowModal(true)}
              >
                + Add organization
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-8 h-8 text-purple-600 animate-spin mb-4" />
              <p className="text-gray-500 text-sm">Loading organizations...</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left text-sm text-gray-600">
                      <th className="pb-3 font-medium">Sr. No</th>
                      <th className="pb-3 font-medium">Organizations</th>
                      <th className="pb-3 font-medium">Pending requests</th>
                      <th className="pb-3 font-medium">
                        <div className="flex items-center gap-1">
                          Status
                          <Filter className="w-4 h-4 text-gray-400" />
                        </div>
                      </th>
                      <th className="pb-3 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrgs.filter((org) => org.name.toLowerCase().includes(search)).map((org, i) => (
                      <tr key={org.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 text-sm">{i + 1}</td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center">
                              <span className="text-purple-600 font-semibold text-xs">
                                {org.name.charAt(0)}
                              </span>
                            </div>
                            <span className="text-sm">{org.name}</span>
                          </div>
                        </td>
                        <td className="py-4 text-sm text-gray-600">45 pending requests</td>
                        <td className="py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                              org.status === "ACTIVE"
                                ? "bg-green-50 text-green-700"
                                : org.status === "BLOCKED"
                                ? "bg-red-50 text-red-700"
                                : "bg-gray-50 text-gray-600"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                org.status === "ACTIVE"
                                  ? "bg-green-600"
                                  : org.status === "BLOCKED"
                                  ? "bg-red-600"
                                  : "bg-gray-500"
                              }`}
                            ></span>
                            {org.status.charAt(0) + org.status.slice(1).toLowerCase()}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <a
                              href={`/organization/${org.id}`}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <Eye className="w-5 h-5" />
                            </a>
                            <button
                              onClick={() => {
                                deleteOrganisation(org.id);
                              }}
                              className="text-gray-400 hover:text-red-600"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {orgs.map((org, i) => (
                  <div key={org.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500 font-medium">{i + 1}</span>
                        <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center">
                          <span className="text-purple-600 font-semibold text-xs">
                            {org.name.charAt(0)}
                          </span>
                        </div>
                        <span className="text-sm font-medium">{org.name}</span>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          org.status === "ACTIVE"
                            ? "bg-green-50 text-green-700"
                            : org.status === "BLOCKED"
                            ? "bg-red-50 text-red-700"
                            : "bg-gray-50 text-gray-600"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            org.status === "ACTIVE"
                              ? "bg-green-600"
                              : org.status === "BLOCKED"
                              ? "bg-red-600"
                              : "bg-gray-500"
                          }`}
                        ></span>
                        {org.status.charAt(0) + org.status.slice(1).toLowerCase()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">45 pending requests</span>
                      <div className="flex items-center gap-3">
                        <a
                          href={`/organization/${org.id}`}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Eye className="w-5 h-5" />
                        </a>
                        <button
                          onClick={() => {
                            deleteOrganisation(org.id);
                          }}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {orgs.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-sm">No organizations found</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-[500px] shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 md:p-6 border-b sticky top-0 bg-white">
              <h2 className="text-base md:text-lg font-semibold">Add Organization</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
                disabled={submitting}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-sm text-gray-700 mb-1.5">
                    Name of the organization
                  </label>
                  <input
                    type="text"
                    placeholder="Text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    disabled={submitting}
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm text-gray-700 mb-1.5">Slug</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    disabled={submitting}
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm text-gray-700 mb-1.5">
                    Organization mail
                  </label>
                  <input
                    type="email"
                    placeholder="Type here"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    disabled={submitting}
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm text-gray-700 mb-1.5">Contact</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={form.contactPhone}
                    onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                    disabled={submitting}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 md:p-6 border-t bg-gray-50 sticky bottom-0">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                onClick={addOrganization}
                disabled={submitting}
              >
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {submitting ? "Adding..." : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}