import { Home } from "lucide-react";

export default function Breadcrumb() {
  return (
    <div className="bg-white px-4 md:px-6 py-3 border-b">
      <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
        <a href="/" className="hover:text-gray-900">
          <Home className="w-4 h-4" />
        </a>
        <span>›</span>
        <a href="/organizations" className="hover:text-gray-900">
          Manage B2B organizations
        </a>
        <span>›</span>
        <span className="text-gray-900">Organization details</span>
      </div>
    </div>
  );
}
