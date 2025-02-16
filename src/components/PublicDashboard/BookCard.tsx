import React from "react";

interface BookCardProps {
  image: string;
  title: string;
  author: string;
  category: string;
  description: string;
  price: string;
}

const BookCard: React.FC<BookCardProps> = ({
  image,
  title,
  author,
  category,
  description,
  price,
}) => {
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
      <button className=" mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
        View Details
      </button>
    </div>
  );
};

export default BookCard;
