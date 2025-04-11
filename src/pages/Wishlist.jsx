import React, { useState } from "react";
import BookList from "../components/BookList";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist") || "[]")
  );

  const removeBook = (book) => {
    const updated = wishlist.filter((b) => b.id !== book.id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div className="container mx-auto mt-24">
      <h2 className="text-2xl font-bold mb-4">Wishlisted Books</h2>
      <BookList
        books={wishlist}
        toggleWishlist={removeBook}
        isWishlisted={() => true}
      />
    </div>
  );
};

export default Wishlist;
