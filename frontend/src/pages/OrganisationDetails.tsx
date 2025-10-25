import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { apiGet, apiPost, apiPut, apiDelete } from "../utils/api";
import Header from "../components/Header";
import Navigation from "../components/OrgDetailsNavigation";
import Breadcrumb from "../components/Breadcrumb";
import OrganizationHeader from "../components/OrganizationHeader";
import BasicDetailsTab from "../components/OrgBasicDetailsTab";
import UsersTab from "../components/OrgUsersTab";
import UserForm from "../components/UserForm";
import UserEditForm from "../components/UserEditForm";

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
  const [userEditform, setUserEditForm] = useState<any>({
    id: "",
    name: "",
    email: "",
    phone: "",
    role: "COORDINATOR",
  });
  const [showEditUser, setShowEditUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, [id]);

  async function loadData() {
    try {
      setLoading(true);
      const orgData = await apiGet(`/organizations/${id}`);
      const usersData = await apiGet(`/users/organization/${id}`);
      setForm(orgData);
      setUsers(usersData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function saveChanges() {
    try {
      setSaving(true);
      await apiPut(`/organizations/${id}`, form);
      setIsEditing(false);
      loadData();
    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
      setSaving(false);
    }
  }

  async function addUser() {
    try {
      await apiPost(`/users`, { ...userForm, organizationId: Number(id) });
      setShowUserModal(false);
      setUserForm({ name: "", email: "", phone: "", role: "COORDINATOR" });
      loadData();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  }

  async function deleteUser(uid: number) {
    try {
      await apiDelete(`/users/${uid}`);
      loadData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  async function handleStatusChange() {
    try {
      const newStatus =
        form.status === "ACTIVE"
          ? "BLOCKED"
          : form.status === "BLOCKED"
          ? "INACTIVE"
          : "ACTIVE";

      await apiPut(`/organizations/${id}`, { status: newStatus });
      setForm({ ...form, status: newStatus });
    } catch (error) {
      console.error("Error changing status:", error);
    }
  }

  function handleEditUser(user: User) {
    setShowEditUser(true);
    setUserEditForm({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
    });
  }

  async function handleUpdateUser() {
    await apiPut(`/users/${userEditform.id}`, userEditform);
    setUserEditForm({
      id: "",
      name: "",
      email: "",
      phone: "",
      role: "COORDINATOR",
    });
    setShowEditUser(false);
    loadData();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      <Breadcrumb />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-10 h-10 text-purple-600 animate-spin mb-4" />
            <p className="text-gray-500 text-sm">Loading organization details...</p>
          </div>
        ) : (
          <>
            <OrganizationHeader form={form} onStatusChange={handleStatusChange} />

            <div className="bg-white rounded-t-lg shadow-sm">
              <div className="flex border-b px-4 md:px-6 overflow-x-auto">
                <button
                  onClick={() => setActiveTab("basic")}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === "basic"
                      ? "text-purple-600 border-purple-600"
                      : "text-gray-600 border-transparent hover:text-gray-900"
                  }`}
                >
                  Basic details
                </button>
                <button
                  onClick={() => setActiveTab("users")}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === "users"
                      ? "text-purple-600 border-purple-600"
                      : "text-gray-600 border-transparent hover:text-gray-900"
                  }`}
                >
                  Users
                </button>
              </div>

              <div className="p-4 md:p-6">
                {activeTab === "basic" && (
                  <BasicDetailsTab
                    form={form}
                    setForm={setForm}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    saving={saving}
                    onSaveChanges={saveChanges}
                  />
                )}

                {activeTab === "users" && (
                  <UsersTab
                    users={users}
                    onAddUser={() => setShowUserModal(true)}
                    onEditUser={handleEditUser}
                    onDeleteUser={deleteUser}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {showUserModal && (
        <UserForm
          action="Add"
          form={userForm}
          setForm={setUserForm}
          onSubmit={addUser}
          onCancel={() => setShowUserModal(false)}
        />
      )}

      {showEditUser && (
        <UserEditForm
          form={userEditform}
          setForm={setUserEditForm}
          onSubmit={handleUpdateUser}
          onCancel={() => setShowEditUser(false)}
        />
      )}
    </div>
  );
}