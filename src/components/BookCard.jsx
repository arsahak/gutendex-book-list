import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const BookCard = ({ book, toggleWishlist, isWishlisted }) => {
  const wishlisted = isWishlisted(book.id);

  return (
    <div className="relative w-full max-w-xl p-4 mx-auto bg-white border border-gray-200 rounded-lg shadow-md ">
      {/* Wishlist icon top-right */}
      <button
        onClick={() => toggleWishlist(book)}
        className="absolute bottom-3 right-3 text-red-500 hover:scale-110 transition-transform duration-200"
        aria-label="Toggle Wishlist"
      >
        {wishlisted ? (
          <FaHeart className="text-xl animate-ping-once" />
        ) : (
          <FaRegHeart className="text-xl" />
        )}
      </button>

      {/* Book image */}
      <img
        src={book.formats["image/jpeg"]}
        alt={book.title}
        className="h-48 w-full object-cover rounded-lg"
      />

      {/* Book details */}
      <Link to={`/books/${book.id}`}>
        <h2 className="text-lg font-semibold mt-3 line-clamp-1 hover:underline">
          {book.title}
        </h2>
      </Link>
      <p className="text-sm text-gray-600 line-clamp-1">
        {book.authors.map((a) => a.name).join(", ")}
      </p>
      <p className="text-sm text-gray-500 mt-1">ID: {book.id}</p>
      <p className="text-sm text-gray-500 line-clamp-1">
        Genre: {book.subjects?.[0] || "N/A"}
      </p>
    </div>
  );
};

export default BookCard;
