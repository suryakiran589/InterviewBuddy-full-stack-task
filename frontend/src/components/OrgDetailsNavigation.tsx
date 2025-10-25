export default function Navigation() {
  return (
    <nav className="bg-white border-b">
      <div className="flex gap-4 md:gap-6 text-xs md:text-sm px-4 md:px-10 overflow-x-auto">
        <a href="/" className="text-gray-500 py-4 whitespace-nowrap hover:text-gray-900">
          Dashboard
        </a>
        <a
          href="/organizations"
          className="text-purple-600 font-medium border-b-2 border-purple-600 py-4 whitespace-nowrap"
        >
          Manage B2B organizations
        </a>
      </div>
    </nav>
  );
}
