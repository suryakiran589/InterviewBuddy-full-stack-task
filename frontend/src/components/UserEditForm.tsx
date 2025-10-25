interface Props {
  form: any;
  setForm: (v: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function UserEditForm({ form, setForm, onSubmit, onCancel }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-lg font-semibold mb-4">Edit User</h2>
        {["name", "email", "phone"].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field}
            className="w-full border p-2 mb-2 rounded"
            value={form[field] || ""}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          />
        ))}
        <select
          className="w-full border p-2 rounded mb-2"
          value={form.role || "COORDINATOR"}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="ADMIN">Admin</option>
          <option value="COORDINATOR">Coordinator</option>
        </select>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onCancel}>Cancel</button>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded"
            onClick={onSubmit}
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  );
}
