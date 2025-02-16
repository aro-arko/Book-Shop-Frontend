import { Link } from "react-router-dom";
import { TProduct } from "../../types/product.type";

const BookCard = ({ product }: { product: TProduct }) => {
  const { _id, image, title, author, category, description, price } = product;
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-300 hover:shadow-lg transition duration-300">
      <img
        className="w-full h-48 object-cover rounded-md mb-4"
        src={image}
        alt={title}
      />
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600">by {author}</p>
      <p className="text-gray-600">#{category}</p>
      <p className="text-gray-600 truncate">{description}</p>
      <p className="text-gray-800 font-bold">${price}</p>
      <Link to={`/books/${_id}`}>
        <button className=" mt-3 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default BookCard;
