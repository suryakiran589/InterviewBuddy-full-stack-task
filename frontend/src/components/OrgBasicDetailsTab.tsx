import { Edit2, Loader2 } from "lucide-react";

interface BasicDetailsTabProps {
  form: any;
  setForm: (form: any) => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  saving: boolean;
  onSaveChanges: () => void;
}

export default function BasicDetailsTab({
  form,
  setForm,
  isEditing,
  setIsEditing,
  saving,
  onSaveChanges,
}: BasicDetailsTabProps) {
  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base md:text-lg font-semibold">Profile</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="w-8 h-8 flex items-center justify-center bg-purple-50 text-purple-600 rounded hover:bg-purple-100 disabled:opacity-50"
          disabled={saving}
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>

      {/* Organization Details */}
      <div>
        <h3 className="text-sm md:text-base font-semibold mb-4">Organization details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Organization name</label>
            <input
              type="text"
              disabled={!isEditing || saving}
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm disabled:text-gray-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Organization SLUG</label>
            <input
              type="text"
              disabled={!isEditing || saving}
              value={form.slug || ""}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm disabled:text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div>
        <h3 className="text-sm md:text-base font-semibold mb-4">Contact details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Primary Admin name</label>
            <input
              type="text"
              disabled={!isEditing || saving}
              value={form.contactName || ""}
              onChange={(e) => setForm({ ...form, contactName: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm disabled:text-gray-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Primary Admin Mail-id</label>
            <input
              type="email"
              disabled={!isEditing || saving}
              value={form.email || ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm disabled:text-gray-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Support Email ID</label>
            <input
              type="email"
              disabled={!isEditing || saving}
              value={form.contactEmail || ""}
              onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm disabled:text-gray-500"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Phone no</label>
              <div className="flex gap-2">
                <select
                  disabled={!isEditing || saving}
                  className="px-2 py-2 bg-gray-50 border border-gray-200 rounded text-sm disabled:text-gray-500"
                >
                  <option>+91</option>
                </select>
                <input
                  type="tel"
                  disabled={!isEditing || saving}
                  value={form.contactPhone || ""}
                  onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm disabled:text-gray-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Alternative phone no</label>
              <div className="flex gap-2">
                <select
                  disabled={!isEditing || saving}
                  className="px-2 py-2 bg-gray-50 border border-gray-200 rounded text-sm disabled:text-gray-500"
                >
                  <option>+91</option>
                </select>
                <input
                  type="tel"
                  disabled={!isEditing || saving}
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm disabled:text-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Maximum Allowed Coordinators */}
      <div>
        <h3 className="text-sm md:text-base font-semibold mb-4">Maximum Allowed Coordinators</h3>
        <div className="max-w-md">
          <label className="block text-xs text-gray-600 mb-1">Max active Coordinators allowed</label>
          <select
            disabled={!isEditing || saving}
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
        <h3 className="text-sm md:text-base font-semibold mb-4">Timezone</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Common name</label>
            <select
              disabled={!isEditing || saving}
              value={form.timezone || ""}
              onChange={(e) => setForm({ ...form, timezone: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm disabled:text-gray-500"
            >
              <option>India Standard Time</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Region</label>
            <select
              disabled={!isEditing || saving}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm disabled:text-gray-500"
            >
              <option>Asia/Colombo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Language */}
      <div>
        <h3 className="text-sm md:text-base font-semibold mb-4">Language</h3>
        <div className="max-w-md">
          <label className="block text-xs text-gray-600 mb-1">Choose the language for organization</label>
          <select
            disabled={!isEditing || saving}
            value={form.language || ""}
            onChange={(e) => setForm({ ...form, language: e.target.value })}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm disabled:text-gray-500"
          >
            <option>English</option>
          </select>
        </div>
      </div>

      {/* Official Website URL */}
      <div>
        <h3 className="text-sm md:text-base font-semibold mb-4">Official website URL</h3>
        <div>
          <label className="block text-xs text-gray-600 mb-1">website URL</label>
          <input
            type="url"
            disabled={!isEditing || saving}
            value={form.websiteUrl || ""}
            onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm disabled:text-gray-500"
          />
        </div>
      </div>

      {/* Action Buttons */}
      {isEditing && (
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            onClick={onSaveChanges}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            disabled={saving}
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}
    </div>
  );
}