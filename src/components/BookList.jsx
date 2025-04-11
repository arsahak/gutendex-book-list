import BookCard from "./BookCard";

const BookList = ({ books, toggleWishlist, isWishlisted }) => (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full my-12">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          toggleWishlist={toggleWishlist}
          isWishlisted={isWishlisted}
        />
      ))}
    </div>
    {books.length === 0 && (
      <div>
        <p colSpan={4} className="py-12 text-center text-gray-500 text-xl">
          No books found
        </p>
      </div>
    )}
  </div>
);

export default BookList;
