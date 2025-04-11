import { Link } from "react-router-dom";

const Navbar = () => (
  <div className="bg-gray-800 text-white py-5 fixed top-0 w-full z-10 shadow-md">
    <nav className="flex items-center justify-between container mx-auto ">
      <h1 className="text-2xl font-bold">Gutendex Book List</h1>
      <div className="space-x-5">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/wishlist" className="hover:underline">
          Wishlist
        </Link>
      </div>
    </nav>
  </div>
);

export default Navbar;
