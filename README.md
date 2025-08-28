# Book Finder (React + Vite + Tailwind)

A clean, fast book search app using the **Open Library Search API**.

## Features

- Search books by **title**
- Shows **cover**, **title**, **authors**, **first publish year**
- Quick **sorting** (Relevance or Year desc)
- **Pagination** controls
- Responsive UI with **Tailwind CSS**
- Graceful error and loading states

## Tech Stack

- React (Vite)
- Tailwind CSS
- Open Library API

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run in dev**

   ```bash
   npm run dev
   ```

3. **Open in browser**
   Vite will print a local URL (typically `http://localhost:5173`).

4. **Build for production**
   ```bash
   npm run build
   npm run preview
   ```

## API

We call:

```
https://openlibrary.org/search.json?title={bookTitle}&page={page}
```

Covers:

```
https://covers.openlibrary.org/b/id/{cover_i}-M.jpg
```

## Structure

```
book-finder/
  src/
    components/
      BookCard.jsx
      BookList.jsx
      SearchBar.jsx
    App.jsx
    index.css
    main.jsx
  index.html
  package.json
  postcss.config.js
  tailwind.config.js
  vite.config.js
```

## Notes

- No API keys needed (public API).
- State: React hooks only.
- Sorting is client-side for top results per page.
- You can deploy to **render** out of the box.
