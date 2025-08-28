import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import BookList from "./components/BookList.jsx";

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState("relevance"); // relevance | year

  useEffect(() => {
    if (!query) return;
    const controller = new AbortController();
    const fetchBooks = async () => {
      setLoading(true);
      setError("");
      try {
        const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&page=${page}`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();

        let docs = data.docs || [];

        if (sort === "year") {
          docs = [...docs].sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
        }

        setBooks(docs.slice(0, 20)); // show top 20 per page for snappy UI
        setTotal(data.numFound || 0);
      } catch (e) {
        if (e.name !== "AbortError") setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
    return () => controller.abort();
  }, [query, page, sort]);

  const onSearch = (q) => {
    setPage(1);
    setQuery(q.trim());
  };

  const totalPages = Math.min( Math.ceil(total / 100), 100 ); // OpenLibrary caps 100 pages; keep UI sane

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-6">
          📚 Book Finder
        </h1>

        <SearchBar onSearch={onSearch} defaultValue={query} />

        <div className="flex items-center justify-between mt-4 gap-3">
          <p className="text-sm text-gray-600">
            {query ? `Results for "${query}"` : "Search any book by its title"}
            {total ? ` • ${total.toLocaleString()} matches` : ""}
          </p>

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-gray-600">Sort by</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border rounded-md px-2 py-1 text-sm"
            >
              <option value="relevance">Relevance</option>
              <option value="year">First Publish Year (desc)</option>
            </select>
          </div>
        </div>

        {loading && <p className="text-center mt-6">Loading...</p>}
        {error && <p className="text-center text-red-600 mt-6">{error}</p>}

        <BookList books={books} />

        {/* Pagination */}
        {query && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-2 rounded-md border disabled:opacity-50"
              disabled={page === 1 || loading}
            >
              Prev
            </button>
            <span className="text-sm text-gray-700">
              Page {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-2 rounded-md border disabled:opacity-50"
              disabled={page === totalPages || loading}
            >
              Next
            </button>
          </div>
        )}

        <footer className="text-center text-xs text-gray-500 mt-10">
          Built with React, Vite, and Tailwind • Open Library Search API
        </footer>
      </div>
    </div>
  );
}