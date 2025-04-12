import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);


  // Fetch book details from the API using the book ID from the URL

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`https://gutendex.com/books/${id}`);
        const data = await res.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading)
    return <div className="p-8 text-center">Loading book details...</div>;

  if (!book) return <div className="p-8 text-center">Book not found</div>;

  return (
    <div className="px-6 md:px-0">
      <div className="container mx-auto mt-24 mb-14 p-3 md:p-8 bg-white shadow-md rounded-lg border border-gray-200">
        <Link to="/" className="text-blue-500 underline mb-4 block">
          ← Back to Books
        </Link>

        <img
          src={book.formats["image/jpeg"]}
          alt={book.title}
          className="w-[50%] md:w-[20%] object-cover rounded-lg mb-4 mt-2"
        />

        <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
        <p className="text-gray-700 mb-2">
          <strong>Authors:</strong> {book.authors.map((a) => a.name).join(", ")}
        </p>
        <p className="mb-2">
          <strong>Subjects:</strong> {book.subjects?.join(", ")}
        </p>
        <p className="mb-2">
          <strong>Download Count:</strong> {book.download_count}
        </p>
        <p className="mb-4">
          <strong>Summery:</strong> {book.summaries}
        </p>
        {book.formats["text/html"] && (
          <a
            href={book.formats["text/html"]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Read Online
          </a>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
