import React, { useEffect, useState } from "react";
import BookCardSkeleton from "../components/BookCardSkeleton";
import BookList from "../components/BookList";

const API_URL = "https://gutendex.com/books";

const Home = () => {
  const [loading, setLoading] = useState(false);

  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState(localStorage.getItem("search") || "");
  const [genre, setGenre] = useState(localStorage.getItem("genre") || "");
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist") || "[]")
  );

  const toggleWishlist = (book) => {
    const exists = wishlist.find((b) => b.id === book.id);
    const updated = exists
      ? wishlist.filter((b) => b.id !== book.id)
      : [...wishlist, book];
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const isWishlisted = (id) => wishlist.some((book) => book.id === id);

  useEffect(() => {
    localStorage.setItem("search", search);
    localStorage.setItem("genre", genre);

    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}?page=${page}&search=${search}`);
        const data = await res.json();

        let filteredBooks = data.results;
        if (genre) {
          filteredBooks = filteredBooks.filter((book) =>
            book.subjects?.includes(genre)
          );
        }

        setBooks(filteredBooks);
        setTotalPages(Math.ceil(data.count / 32));
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [page, search, genre]);

  const genres = Array.from(
    new Set(books.flatMap((b) => b.subjects || []))
  ).slice(0, 10);

  const handlePageChange = (pageNum) => {
    setPage(pageNum);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container mx-auto mt-32">
      
      {/* Books Search and Fillter by genres */}

      <div className="flex flex-col md:flex-row justify-between gap-2">
        <input
          type="text"
          className="border rounded px-3 py-2 border-gray-400 w-full md:w-1/3 text-base placeholder:text-base"
          placeholder="Search Books..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <div className="flex items-center justify-center relative w-full md:w-1/4">
          <select
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value);
              setPage(1);
            }}
            className="appearance-none border border-gray-400 rounded px-3 py-2 w-full text-base text-gray-700 focus:outline-none  transition duration-300"
          >
            <option value="">All Genres</option>
            {genres.map((g, i) => (
              <option key={i} value={g}>
                {g}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500 transition-transform duration-300 group-hover:rotate-180">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Books List */}

      {loading ? (
        <BookCardSkeleton />
      ) : (
        <>
          <BookList
            books={books}
            toggleWishlist={toggleWishlist}
            isWishlisted={isWishlisted}
          />

          {/* Pagination */}

          <div className="p-4 flex justify-center flex-wrap gap-2 mb-10">
            {/* Previous Button */}

            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`px-3 py-1 border rounded cursor-pointer  w-24 ${
                page === 1
                  ? "bg-gray-200 cursor-not-allowed opacity-50"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              Previous
            </button>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className={`px-3 py-1 border rounded cursor-pointer w-24 ${
                page === totalPages
                  ? "bg-gray-200 cursor-not-allowed opacity-50"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
