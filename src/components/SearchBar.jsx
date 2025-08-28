import { useState } from "react";

export default function SearchBar({ onSearch, defaultValue = "" }) {
  const [q, setQ] = useState(defaultValue);

  const submit = (e) => {
    e.preventDefault();
    if (q.trim()) onSearch(q);
  };

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row items-stretch gap-2">
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search for a book by title..."
        className="flex-1 border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}