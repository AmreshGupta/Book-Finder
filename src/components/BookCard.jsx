export default function BookCard({ book }) {
  const coverId = book.cover_i;
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/160x220?text=No+Cover";

  const authors = book.author_name?.join(", ") || "Unknown Author";
  const year = book.first_publish_year || "N/A";
  const subjects = book.subject?.slice(0, 3).join(" • ");

  const workKey = book.key; // e.g. "/works/OL12345W"
  const openUrl = workKey ? `https://openlibrary.org${workKey}` : null;

  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition p-3 flex flex-col">
      <img
        src={coverUrl}
        alt={book.title}
        className="w-full h-56 object-cover rounded-lg mb-3"
        loading="lazy"
      />
      <h2 className="font-semibold line-clamp-2 min-h-[3.25rem]">{book.title}</h2>
      <p className="text-sm text-gray-600">{authors}</p>
      <p className="text-xs text-gray-500 mt-1">First Published: {year}</p>
      {subjects && <p className="text-xs text-gray-500 mt-1">{subjects}</p>}
      {openUrl && (
        <a
          className="mt-3 text-sm underline text-blue-600 hover:text-blue-800"
          href={openUrl}
          target="_blank"
          rel="noreferrer"
        >
          View on Open Library
        </a>
      )}
    </div>
  );
}