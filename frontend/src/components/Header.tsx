import { Bell, User } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-gray-900 px-4 md:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4 md:gap-8">
        <div className="border-2 border-white px-3 py-1 font-bold text-xs md:text-sm text-white">
          CollegeAtlas 
        </div>
      </div>
      <div className="flex items-center gap-3 md:gap-4">
        <button className="text-white hover:text-gray-300">
          <Bell className="w-5 h-5" />
        </button>
        <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-purple-600 flex items-center justify-center text-white hover:bg-purple-700">
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}