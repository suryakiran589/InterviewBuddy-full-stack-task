import { Mail, Phone, Globe } from "lucide-react";
import OrgLogo from "./OrgLogo";

interface OrganizationHeaderProps {
  form: any;
  onStatusChange: () => void;
}

export default function OrganizationHeader({ form, onStatusChange }: OrganizationHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
      <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
        <OrgLogo organization={form} />
        <div className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-2">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
              {form.name || ""}
            </h1>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 text-sm">
                <span
                  className={`w-2 h-2 rounded-full ${
                    form.status === "ACTIVE"
                      ? "bg-green-500"
                      : form.status === "BLOCKED"
                      ? "bg-red-500"
                      : "bg-gray-500"
                  }`}
                ></span>
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
              <button
                onClick={onStatusChange}
                className="text-purple-600 text-sm font-medium hover:underline"
              >
                Change status
              </button>
            </div>
          </div>
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="break-all">{form.email || ""}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{form.contactPhone || ""}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <a
                href={form.websiteUrl || "#"}
                className="text-purple-600 hover:underline break-all"
              >
                {form.websiteUrl || ""}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
